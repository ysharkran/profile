import type { IconType } from "react-icons";
import {
  SiCypress,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGithubactions,
  SiGraphql,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxt,
  SiOpenai,
  SiPostgresql,
  SiPuppeteer,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiRust,
  SiScikitlearn,
  SiSelenium,
  SiSolana,
  SiTailwindcss,
  SiTerraform,
  SiTensorflow,
  SiTestinglibrary,
  SiTypescript,
  SiVitest,
  SiVuedotjs,
  SiWeb3Dotjs,
} from "react-icons/si";
import {
  TbApi,
  TbBinaryTree2,
  TbBrandAws,
  TbBrowserCheck,
  TbComponents,
  TbGauge,
} from "react-icons/tb";

const fallbackSkillIcon = TbBinaryTree2;

const skillIcons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  Vue: SiVuedotjs,
  "Nuxt.js": SiNuxt,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Material UI": SiMui,
  "Node.js": SiNodedotjs,
  "Nest.js": SiNestjs,
  "Express.js": SiExpress,
  Python: SiPython,
  FastAPI: SiFastapi,
  Django: SiDjango,
  GraphQL: SiGraphql,
  "REST APIs": TbApi,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  MySQL: SiMysql,
  AWS: TbBrandAws,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  "CI/CD": SiGithubactions,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  "Scikit-learn": SiScikitlearn,
  "OpenAI APIs": SiOpenai,
  "System Design": TbComponents,
  "Performance Optimization": TbGauge,
  Rust: SiRust,
  Solana: SiSolana,
  "Web3.js": SiWeb3Dotjs,
  Selenium: SiSelenium,
  Jest: SiJest,
  Cypress: SiCypress,
  Playwright: TbBrowserCheck,
  Vitest: SiVitest,
  "Testing Library": SiTestinglibrary,
  Puppeteer: SiPuppeteer,
  OpenAI: SiOpenai,
};

type SkillChipProps = {
  skill: string;
};

export function SkillChip({ skill }: SkillChipProps) {
  const Icon = skillIcons[skill] ?? fallbackSkillIcon;

  return (
    <span className="resume-skill-chip">
      <span className="resume-skill-chip__icon" aria-hidden="true">
        <Icon size={14} />
      </span>
      <span>{skill}</span>
    </span>
  );
}
