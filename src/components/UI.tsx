import type { ReactNode } from 'react';
import type { CopyBlock, Option } from '../types';
import { withoutSentencePeriods } from '../utils/punctuation';
export function Bilingual({
  en,
  zh,
  className = ''
}: CopyBlock & {
  className?: string;
}) {
  return <div className={`bilingual ${className}`}><div className="en">{withoutSentencePeriods(en)}</div>{zh && <div className="zh" lang="zh-CN">{withoutSentencePeriods(zh)}</div>}</div>;
}
export function Action({
  children,
  onClick,
  disabled = false,
  secondary = false,
  className = ''
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  secondary?: boolean;
  className?: string;
}) {
  return <button className={`${secondary ? 'text-button' : 'action'} ${className}`} onClick={onClick} disabled={disabled}>{children}{!secondary && <svg className="action-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 19L19 5M5 5h14v14" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>}</button>;
}
export function Options({
  options,
  value,
  onSelect,
  multiple = false
}: {
  options: Option[];
  value?: string | string[];
  onSelect: (value: string) => void;
  multiple?: boolean;
}) {
  return <div className="options" role="group">{options.map((option, i) => {
      const selected = multiple ? Array.isArray(value) && value.includes(option.value) : value === option.value;
      return <button key={option.value} className={`option ${selected ? 'selected' : ''}`} aria-pressed={selected} onClick={() => onSelect(option.value)}><span className="option-index">{String(i + 1).padStart(2, '0')}</span><Bilingual en={option.en} zh={option.zh} /><span className="option-mark" aria-hidden="true">{selected ? '●' : '○'}</span></button>;
    })}</div>;
}
export function PanelLabel({
  children
}: {
  children: ReactNode;
}) {
  return <div className="panel-label">{children}</div>;
}
