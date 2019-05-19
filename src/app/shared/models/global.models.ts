export class IBasket {
    Id: number;
    Title: string;
    Price: number;
    Count: number;
    TotalPrice: number;
    OrderId?: number;
    Order?: IOrder;
}

export class IProduct {
    ID?: number;
    Title: string;
    Description: string;
    Price: number;
    ImageSrc: string;
    Category: string;
}

export class IOrder {
    Id?: number;
    UserFirstName: string;
    UserLastName: string;
    UserEmail: string;
    UserPhone: string;
    Address: string;
    TotalPrice: number;
}

export class IUser {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    userEmail: string;
}

export class Slider {
    captionTitle: string;
    captionText: string;
    src: string;
}