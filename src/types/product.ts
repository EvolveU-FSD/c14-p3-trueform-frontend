// src/types/product.ts
export interface Product {
    id: string;
    image: string;
    category: string;
    name: string;
    price: number;
    description?: string;
    sizes?: string[];
    colors?: string[];
    isNew?: boolean;
    isPopular?: boolean;
}

export interface FeaturedItemsProps {
    title: string;
    items: Product[];
    seeAllLink?: string;
}

export interface ItemCardProps {
    product: Product;
    onPress?: (product: Product) => void;
}

// Add these interfaces to src/types/product.ts

export interface Category {
    id: string;
    name: string;
    image: string;
}

export interface CategorySectionProps {
    categories: Category[];
    onCategoryPress?: (category: Category) => void;
}

export interface HeroBannerProps {
    title: string;
    image: string;
    onPress?: () => void;
}

export interface NavButtonProps {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    isActive?: boolean;
}

export interface BottomNavBarProps {
    activeTab: string;
    onTabChange: (tabName: string) => void;
}