

import { trackingAPI } from '../api/endpoints';
import { signify } from 'react-signify';
import { message } from 'antd';
import type { Tracking } from '../types/tracking';


export const sAllTracking = signify<Tracking[]>([]);
export const sTrackingLoading = signify<boolean>(false);

export const useTracking = () => sAllTracking.use();
export const useTrackingLoading = () => sTrackingLoading.use();

export const fetchAllTracking = async () => {
    sTrackingLoading.set(true);
    try {
        const response = await trackingAPI.getAllTracking();
        sAllTracking.set(response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu tracking:', error);
        message.error('Không thể tải dữ liệu tracking');
        sAllTracking.set([]);
    } finally {
        sTrackingLoading.set(false);
    }
};


export const fetchTrackingByTutor = async (tutorUserId: number) => {
    sTrackingLoading.set(true);
    try {
        const response = await trackingAPI.getAllTrackingByTutor(tutorUserId);
        sAllTracking.set(response.data);

        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu tracking theo tutor:', error);
        message.error('Không thể tải dữ liệu tracking theo tutor');
        sAllTracking.set([]);
    } finally {
        sTrackingLoading.set(false);
    }
};