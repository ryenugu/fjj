import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Homepage headline (tagline)",
      type: "string",
    }),
    defineField({
      name: "heroLead",
      title: "Homepage lead paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutParagraphs",
      title: "About page paragraphs",
      type: "array",
      of: [{ type: "text", rows: 5 }],
    }),
    defineField({
      name: "classGi",
      title: "Gi schedule card",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
        { name: "days", title: "Days line", type: "string" },
      ],
    }),
    defineField({
      name: "classNoGi",
      title: "No-Gi schedule card",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
        { name: "days", title: "Days line", type: "string" },
      ],
    }),
    defineField({
      name: "scheduleSessions",
      title: "Class times (shown under Gi and No-Gi)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "kind",
              title: "Kind",
              type: "string",
              options: {
                list: [
                  { title: "Kids", value: "kids" },
                  { title: "Adults", value: "adults" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            },
            { name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() },
            { name: "time", title: "Time", type: "string", validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: "label", subtitle: "time" },
          },
        },
      ],
    }),
    defineField({
      name: "businessHours",
      title: "Business hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "days", title: "Days", type: "string", validation: (Rule) => Rule.required() },
            { name: "hours", title: "Hours", type: "string", validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: "announcement",
      title: "Announcement banner",
      type: "object",
      description: "Displays a banner at the top of every page. Toggle off to hide it.",
      fields: [
        {
          name: "enabled",
          title: "Show banner",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "text",
          title: "Message",
          type: "string",
          description: "Keep it short — one sentence.",
        },
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact & links",
      type: "object",
      fields: [
        { name: "phoneDisplay", title: "Phone (display)", type: "string" },
        { name: "phoneTel", title: "Phone (tel: link, E.164)", type: "string" },
        { name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required() },
        {
          name: "addressLines",
          title: "Address lines",
          type: "array",
          of: [{ type: "string" }],
        },
        { name: "mapsUrl", title: "Google Maps URL", type: "url" },
        { name: "websiteUrl", title: "Website URL", type: "url" },
        { name: "instagramUrl", title: "Instagram URL", type: "url" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
