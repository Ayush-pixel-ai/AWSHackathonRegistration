import React from 'react';

const TECH_OPTIONS = [
  'PyTorch',
  'Kubernetes',
  'Solidity',
  'Rust',
  'TypeScript',
  'AWS'
];

export const TechStackSelector = ({ selectedTags, onChange }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
        Primary Technologies / Stack (Optional)
      </label>
      <div className="flex wrap gap-2.5">
        {TECH_OPTIONS.map(tag => {
          const isChecked = selectedTags.includes(tag);
          return (
            <label
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-medium transition-all ${
                isChecked
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}}
                className="hidden"
              />
              <span>{tag}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
