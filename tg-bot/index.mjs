const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || '9guj7jch';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN;
const ALLOWED_CHAT_IDS = (process.env.ALLOWED_CHAT_IDS || '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

if (!BOT_TOKEN || !SANITY_WRITE_TOKEN) {
  console.error('Missing TELEGRAM_BOT_TOKEN or SANITY_WRITE_TOKEN');
  process.exit(1);
}

let offset = 0;

async function getUpdates() {
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=30`
  );
  const data = await res.json();
  return data.result || [];
}

async function getFileUrl(fileId) {
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
  );
  const data = await res.json();
  return `https://api.telegram.org/file/bot${BOT_TOKEN}/${data.result.file_path}`;
}

async function reply(chatId, text) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

async function setAnnouncement(text, enabled) {
  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mutations: [{
          patch: {
            query: "*[_type == 'siteSettings'][0]",
            set: { 'announcement.text': text, 'announcement.enabled': enabled },
          },
        }],
      }),
    }
  );
  const result = await res.json();
  if (result.error) throw new Error(JSON.stringify(result.error));
  return result;
}

async function uploadToSanity(imageBuffer, caption) {  const filename = `telegram-${Date.now()}.jpg`;

  // 1. Upload image asset to Sanity
  const assetRes = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/assets/images/${SANITY_DATASET}?filename=${filename}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
        'Content-Type': 'image/jpeg',
      },
      body: imageBuffer,
    }
  );

  const assetData = await assetRes.json();
  if (!assetData.document?._id) {
    throw new Error(`Asset upload failed: ${JSON.stringify(assetData)}`);
  }

  const assetId = assetData.document._id;

  // 2. Create galleryItem document
  const mutateRes = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mutations: [
          {
            create: {
              _type: 'galleryItem',
              title: caption || '',
              image: {
                _type: 'image',
                asset: { _type: 'reference', _ref: assetId },
              },
              order: Date.now(),
            },
          },
        ],
      }),
    }
  );

  const result = await mutateRes.json();
  if (result.error) throw new Error(JSON.stringify(result.error));
  return result;
}

async function handleUpdate(update) {
  const msg = update.message;
  if (!msg) return;

  const chatId = msg.chat.id;

  if (ALLOWED_CHAT_IDS.length > 0 && !ALLOWED_CHAT_IDS.includes(String(chatId))) {
    console.log(`Rejected unauthorized user chat_id: ${chatId}`);
    await reply(chatId, '⛔ You are not authorized to use this bot.');
    return;
  }

  if (msg.photo) {
    try {
      await reply(chatId, '⏳ Uploading to gallery...');

      const photo = msg.photo[msg.photo.length - 1]; // largest size
      const fileUrl = await getFileUrl(photo.file_id);
      const imgRes = await fetch(fileUrl);
      const imgBuffer = Buffer.from(await imgRes.arrayBuffer());

      const caption = msg.caption || '';
      await uploadToSanity(imgBuffer, caption);

      await reply(chatId, '✅ Photo added to gallery!');
      console.log(`Uploaded photo from chat ${chatId}`);
    } catch (err) {
      console.error('Upload error:', err.message);
      await reply(chatId, '❌ Failed to upload. Please try again.');
    }
  } else if (msg.text === '/upload') {
    await reply(chatId, '📸 Send me your photo now. You can add a caption too — it\'ll be saved as the title.');
  } else if (msg.text?.startsWith('/announce')) {
    const text = msg.text.slice('/announce'.length).trim();
    if (!text) {
      await reply(chatId, 'Usage: /announce Your message here\n\nExample: /announce Free trial week — sign up now!');
      return;
    }
    try {
      await setAnnouncement(text, true);
      await reply(chatId, `📢 Banner set: "${text}"`);
    } catch (err) {
      console.error('Announce error:', err.message);
      await reply(chatId, '❌ Failed to set announcement.');
    }
  } else if (msg.text === '/clearannounce') {
    try {
      await setAnnouncement('', false);
      await reply(chatId, '✅ Announcement banner cleared.');
    } catch (err) {
      console.error('Clear announce error:', err.message);
      await reply(chatId, '❌ Failed to clear announcement.');
    }
  } else if (msg.text) {
    console.log(`Text message from chat_id: ${chatId} (${msg.from?.username || msg.from?.first_name || 'unknown'})`);
    await reply(chatId, `Your chat ID is: ${chatId}\nSend me a photo and I'll add it to the gallery.\n\nCommands:\n/announce <message> — show a banner on the site\n/clearannounce — remove the banner`);
  }
}

async function poll() {
  console.log('Telegram gallery bot started, polling for updates...');
  while (true) {
    try {
      const updates = await getUpdates();
      for (const update of updates) {
        offset = update.update_id + 1;
        await handleUpdate(update);
      }
    } catch (err) {
      console.error('Poll error:', err.message);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

poll();
