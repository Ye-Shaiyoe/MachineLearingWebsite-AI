import { relations } from "drizzle-orm";
import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const messageRoleEnum = pgEnum("message_role", [
  "system",
  "user",
  "assistant",
  "tool",
]);

export const conversations = pgTable(
  "conversations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull().default("New conversation"),
    model: text("model").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("conversations_userId_idx").on(table.userId)],
);

export const messages = pgTable(
  "messages",
  {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    role: messageRoleEnum("role").notNull(),
    content: text("content").notNull(),
    model: text("model"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("messages_conversationId_idx").on(table.conversationId),
  ],
);

export const generatedImages = pgTable(
  "generated_images",
  {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    messageId: text("message_id").references(() => messages.id, {
      onDelete: "set null",
    }),
    prompt: text("prompt").notNull(),
    storageKey: text("storage_key").notNull(),
    url: text("url").notNull(),
    mediaType: text("media_type").notNull().default("image/png"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("generated_images_conversationId_idx").on(table.conversationId),
  ],
);

export const conversationRelations = relations(conversations, ({ one, many }) => ({
  user: one(user, {
    fields: [conversations.userId],
    references: [user.id],
  }),
  messages: many(messages),
  generatedImages: many(generatedImages),
}));

export const messageRelations = relations(messages, ({ one, many }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  generatedImages: many(generatedImages),
}));

export const generatedImageRelations = relations(generatedImages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [generatedImages.conversationId],
    references: [conversations.id],
  }),
  message: one(messages, {
    fields: [generatedImages.messageId],
    references: [messages.id],
  }),
}));
