import { signify } from "react-signify";
import type { Booking } from "../types/booking";
import { bookingAPI } from "../api/endpoints";

export const sBookingUser = signify<Booking[]>([]);
export const sBooking = signify<Booking[]>([]);


export const useBookingUser = () => sBookingUser.use();
export const useBooking = () => sBooking.use();

export const getAllBookingByUserId = async (userId: number) => {
    try {
        const res = await bookingAPI.getUserBookings(userId)
        sBookingUser.set(res.data);
        return res.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
}


export const getAllBooking = async () => {
    try {
        const res = await bookingAPI.getAllBookings();
        console.log('Bookings:', res.data);
        sBooking.set(res.data || []);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách booking:', error);
        sBooking.set([]);
    }
};