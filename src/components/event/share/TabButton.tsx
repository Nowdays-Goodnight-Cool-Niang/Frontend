import { ITabButtonOption } from '@/types/common/ui';

interface TabButtonProps {
  option: ITabButtonOption;
  selected: boolean;
  onClick: (value: string) => void;
}

export default function TabButton({ option, selected, onClick }: TabButtonProps) {
  return (
    <button
      onClick={() => onClick(option.value)}
      className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ${
        selected ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-400'
      }`}
    >
      <span>{option.label}</span>
    </button>
  );
}
