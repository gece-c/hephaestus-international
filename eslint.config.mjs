import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const m3TypographyMessage =
  "Use M3 typography: semantic HTML, type-* / lib/typography type.* classes, or components/ui/typography.tsx. See app/globals.css.";

const forbiddenTextSizePattern =
  /(?:^|[\s"'`{])text-(?:xs|sm|base|lg|xl|[2-9]xl)(?:[\s"'`}]|$)/;

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: `Literal[value=/${forbiddenTextSizePattern.source}/]`,
          message: m3TypographyMessage,
        },
        {
          selector: `TemplateElement[value.raw=/${forbiddenTextSizePattern.source}/]`,
          message: m3TypographyMessage,
        },
        {
          selector: "Literal[value=/text-\\[/]",
          message: m3TypographyMessage,
        },
        {
          selector: "TemplateElement[value.raw=/text-\\[/]",
          message: m3TypographyMessage,
        },
      ],
    },
  },
];

export default eslintConfig;
