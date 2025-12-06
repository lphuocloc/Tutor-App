export interface Booking {
    bookingId: number;
    chatRoomId: number;
    agreedPricePerSession: number;
    sessionsPerWeek: number;
    agreedDays: string;
    agreedTime: string;
    startDate: string;
    endDate: string;
    bookingStatus: string;
    createdAt: string;
}
