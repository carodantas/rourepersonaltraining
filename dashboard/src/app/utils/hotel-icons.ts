export type IconOption = { value: string; label: string };

// FontAwesome "solid" icon names (without the "fa-" prefix)
export const HOTEL_ICON_OPTIONS: IconOption[] = [
  { value: 'check', label: 'Check (padrão)' },
  { value: 'wifi', label: 'Wi‑Fi' },
  { value: 'tv', label: 'TV' },
  { value: 'snowflake', label: 'Ar-condicionado' },
  { value: 'fan', label: 'Ventilação' },
  { value: 'bed', label: 'Cama' },
  { value: 'bath', label: 'Banheira' },
  { value: 'shower', label: 'Chuveiro' },
  { value: 'toilet-paper', label: 'Banheiro' },
  { value: 'mug-saucer', label: 'Café / Chá' },
  { value: 'utensils', label: 'Cozinha / Refeição' },
  { value: 'martini-glass', label: 'Bar' },
  { value: 'bell-concierge', label: 'Serviço / Recepção' },
  { value: 'car', label: 'Estacionamento' },
  { value: 'key', label: 'Chave' },
  { value: 'door-open', label: 'Acesso' },
  { value: 'lock', label: 'Cofre / Segurança' },
  { value: 'shield-halved', label: 'Segurança' },
  { value: 'phone', label: 'Telefone' },
  { value: 'envelope', label: 'Email' },
  { value: 'clock', label: 'Horário' },
  { value: 'calendar-days', label: 'Calendário' },
  { value: 'map-location-dot', label: 'Localização' },
  { value: 'person-swimming', label: 'Piscina' },
  { value: 'water-ladder', label: 'Piscina (escada)' },
  { value: 'spa', label: 'Spa' },
  { value: 'dumbbell', label: 'Academia' },
  { value: 'umbrella-beach', label: 'Praia' },
  { value: 'tree', label: 'Jardim' },
  { value: 'users', label: 'Família / Grupo' },
  { value: 'child', label: 'Kids' },
  { value: 'wheelchair', label: 'Acessibilidade' },
  { value: 'paw', label: 'Pet-friendly' },
  { value: 'smoking-ban', label: 'Não-fumante' },
  { value: 'desktop', label: 'Mesa de trabalho' },
  { value: 'suitcase-rolling', label: 'Bagagem' },
  { value: 'camera', label: 'Fotos' }
];

export function faIconClass(iconName: string): string {
  const raw = (iconName || 'check').toString().trim();
  const faName = raw.startsWith('fa-') ? raw : `fa-${raw}`;
  return `fa-solid ${faName}`;
}

