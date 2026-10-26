export type SubtitleChoice = 'A' | 'B' | 'CUSTOM';
export type ChoiceKey = 'openingMemory' | 'qMemory' | 'qEmotion' | 'qAutonomy' | 'memoryFrame' | 'aiExperience' | 'aiScenario1' | 'aiScenario2' | 'aiScenario3';
export interface ExperienceState {
  openingMemory?: string;
  openingMemoryReconsidered?: string;
  baselineOriginal: {
    cells: number;
    interlinked: number;
    within: number;
  };
  qMemory?: string;
  qEmotion?: string;
  qAutonomy?: string;
  memoryFrame?: string;
  subtitleJoi?: SubtitleChoice;
  subtitleK?: SubtitleChoice;
  customJoi: string;
  customK: string;
  subtitlesConfirmed: boolean;
  translationReasons: string[];
  translationReasonText: string;
  aiExperience?: string;
  aiScenario1?: string;
  aiScenario2?: string;
  aiScenario3?: string;
  finalThought: string;
  finalThought2: string;
}
export interface ScreenProps {
  screenId: string;
  state: ExperienceState;
  update: (patch: Partial<ExperienceState>) => void;
  navigate: (id: string) => void;
  next: () => void;
  restart: () => void;
}
export interface CopyBlock {
  en: string;
  zh?: string;
}
export interface Option extends CopyBlock {
  value: string;
}
export interface ScreenData {
  id: string;
  number: string;
  title: string;
  zhTitle: string;
  chapter: string;
  theme: string;
  blocks: CopyBlock[];
  options?: Option[];
  choiceKey?: ChoiceKey;
  cta?: string;
  ctaZh?: string;
  kind?: string;
}
