export interface FilterOption {
  name: string;
  value: string | number;
}

export interface Filters {
  title: string;
  level: string;
  language: string;
}

export interface FiltersState {
  filtersList: {
    title: string;
    level: string;
    language: string;
  }
}

export interface TextFieldFilterProps {
  filterKey: string;
  label: string;
}

export interface MenuFilterProps extends TextFieldFilterProps {
  options: FilterOption[]
}