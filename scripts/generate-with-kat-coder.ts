/**
 * OpenRouter KAT-Coder-Pro Code Generation Script
 *
 * This script acts as the bridge between the orchestrator (Claude Code)
 * and the KAT-Coder-Pro model for generating code.
 */

import * as fs from 'fs';
import * as path from 'path';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const MODEL = 'kwaipilot/kat-coder-pro:free';

interface GenerationRequest {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

interface GenerationResponse {
  success: boolean;
  code?: string;
  error?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Generate code using KAT-Coder-Pro via OpenRouter API
 */
async function generateCode(request: GenerationRequest): Promise<GenerationResponse> {
  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://grant-automation.com',
        'X-Title': 'Grant Automation - Clerk Custom UI',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          ...(request.systemPrompt ? [{
            role: 'system',
            content: request.systemPrompt,
          }] : []),
          {
            role: 'user',
            content: request.prompt,
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    return {
      success: true,
      code: data.choices[0]?.message?.content || '',
      usage: data.usage,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: ts-node generate-with-kat-coder.ts <prompt-file>');
    console.error('Example: ts-node generate-with-kat-coder.ts prompts/custom-sign-in.txt');
    process.exit(1);
  }

  const promptFilePath = args[0];
  const fullPath = path.resolve(promptFilePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`Error: Prompt file not found: ${fullPath}`);
    process.exit(1);
  }

  console.log(`📝 Reading prompt from: ${fullPath}`);
  const prompt = fs.readFileSync(fullPath, 'utf-8');

  console.log(`🤖 Calling KAT-Coder-Pro via OpenRouter...`);
  console.log(`Model: ${MODEL}`);
  console.log(`Prompt length: ${prompt.length} characters\n`);

  const result = await generateCode({
    prompt,
    systemPrompt: 'You are an expert React/Next.js developer specializing in TypeScript, Tailwind CSS, and Clerk authentication. Generate clean, production-ready code following best practices.',
    temperature: 0.7,
  });

  if (!result.success) {
    console.error(`❌ Generation failed: ${result.error}`);
    process.exit(1);
  }

  console.log(`✅ Generation successful!`);
  console.log(`📊 Usage: ${result.usage?.total_tokens} tokens (${result.usage?.prompt_tokens} prompt + ${result.usage?.completion_tokens} completion)`);
  console.log(`\n${'='.repeat(80)}\n`);
  console.log(result.code);
  console.log(`\n${'='.repeat(80)}\n`);

  // Save to output file
  const outputDir = path.join(process.cwd(), 'generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFileName = path.basename(promptFilePath, path.extname(promptFilePath)) + '.tsx';
  const outputPath = path.join(outputDir, outputFileName);

  fs.writeFileSync(outputPath, result.code || '', 'utf-8');
  console.log(`💾 Code saved to: ${outputPath}`);
}

main().catch(console.error);
