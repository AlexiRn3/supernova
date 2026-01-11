'use client';

interface Props {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="apple-card p-6 flex flex-col justify-center h-full hover:bg-surface-highlight transition-colors">
      <h3 className="text-secondary text-xs font-medium uppercase tracking-wide mb-2">{title}</h3>
      <div className="text-2xl font-semibold text-primary font-mono tracking-tight">
        {value}
      </div>
    </div>
  );
}