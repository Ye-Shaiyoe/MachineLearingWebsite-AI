import { CHAT_MODELS, DEFAULT_IMAGE_MODEL } from "@/types/ai";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm tracking-wide text-neutral-500 uppercase">
        Foundation
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">AI Chat</h1>
      <p className="max-w-xl text-neutral-600 dark:text-neutral-400">
        Project structure, database schema, authentication, OpenRouter, and R2
        storage are in place. Chat UI, streaming routes, and image generation
        flows are next.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
        {CHAT_MODELS.map((model) => (
          <li key={model}>
            <code>{model}</code>
          </li>
        ))}
        <li>
          Image: <code>{DEFAULT_IMAGE_MODEL}</code>
        </li>
      </ul>
    </main>
  );
}
