export interface Tracking {
    trackingId: number;
    bookingId: number;
    tutorUserId: number;
    tutorUserName: string;
    action: string;
    actionAt: string;
    location: string;
    securityCodeUsed: string;
}
