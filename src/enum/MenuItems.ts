export enum MenuItems {
    DASHBOARD = '대시보드',
    MEMBER = '회원정보',
    PRODUCT = '투자상품정보',
    TOKEN = '토큰정보관리',
    CUSTOMER_SERVICE = '고객지원관리'
}

export type PathText = 'dashboard' | 'member' | 'product' | 'token' | 'customerService';

export function getMenuItem(param: 'dashboard' | 'member' | 'product' | 'token' | 'customerService'): MenuItems {
    switch(param) {
        case 'dashboard': return MenuItems.DASHBOARD;
        case 'member': return MenuItems.MEMBER;
        case 'product': return MenuItems.PRODUCT;
        case 'token': return MenuItems.TOKEN;
        case 'customerService': return MenuItems.CUSTOMER_SERVICE;
        default: return MenuItems.DASHBOARD;
    }
}