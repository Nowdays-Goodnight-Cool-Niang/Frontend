import { EventTabType } from '@/constants/event';
import { create } from 'zustand';

interface IEventTabsStore {
  selected: EventTabType;
  setSelected: (eventTabType: EventTabType) => void;
}

export const useEventTabsStore = create<IEventTabsStore>((set) => ({
  selected: EventTabType.profile,
  setSelected: (eventTabType: EventTabType) => set({ selected: eventTabType }),
}));
