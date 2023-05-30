export interface AutoFilterRequest<T> {
    label: string;
    displayedField?: string;
    items: T[];
}