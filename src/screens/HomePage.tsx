import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import imageTutor from '../assets/tutorandparent.png';
import { Link } from 'react-router-dom';

// Using inline SVG icons in Ant Design style
const AntSearchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M909.6 854.5L649.9 594.8C693.3 537.1 716.4 466.8 716.4 390.8C716.4 208.6 558.4 50 368.2 50C178.1 50 20.1 208.6 20.1 390.8C20.1 573 178.1 731.6 368.2 731.6C444.2 731.6 514.5 708.5 572.2 665.1L832 924.9C848.4 941.3 874.6 941.3 891 924.9L909.6 854.5ZM368.2 642.6C229.4 642.6 116.1 529.3 116.1 390.8C116.1 252.3 229.4 139 368.2 139C507.1 139 620.4 252.3 620.4 390.8C620.4 529.3 507.1 642.6 368.2 642.6Z" />
    </svg>
);

const AntTeamIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 0C282.8 0 96 186.8 96 416c0 107.1 41.6 205.8 112.5 281.4C251.6 738.5 256 749.6 256 761.8v114.5c0 14.7 11.9 26.6 26.6 26.6h44.5c14.7 0 26.6-11.9 26.6-26.6V822.8c0-29.2-22.1-53.5-51.1-55.9l-26.2-2.3c-28.7-2.6-52.6-26.1-52.6-55.2V734.5c0-12.2-4.4-23.3-12.5-31.4C137.6 632.8 96 534.1 96 416c0-229.2 186.8-416 416-416s416 186.8 416 416c0 118.1-41.6 216.8-112.5 292.5c-8.1 8.1-12.5 19.2-12.5 31.4v26.1c0 29.1-23.9 52.6-52.6 55.2l-26.2 2.3c-29 2.4-51.1 26.7-51.1 55.9v53.5c0 14.7 11.9 26.6 26.6 26.6h44.5c14.7 0 26.6-11.9 26.6-26.6v-114.5c0-12.2 4.4-23.3 12.5-31.4C880.4 621.8 928 523.1 928 416c0-229.2-186.8-416-416-416zM512 512c-88.4 0-160-71.6-160-160s71.6-160 160-160s160 71.6 160 160s-71.6 160-160 160zM768 864H256v64h512v-64z" />
    </svg>
);

const AntAcademicIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zM488 440c0-13.3 10.7-24 24-24h152c13.3 0 24 10.7 24 24s-10.7 24-24 24H512c-13.3 0-24-10.7-24-24zm184 264H352c-13.3 0-24 10.7-24 24s10.7 24 24 24h320c13.3 0 24-10.7 24-24s-10.7-24-24-24zm0-128H352c-13.3 0-24 10.7-24 24s10.7 24 24 24h320c13.3 0 24-10.7 24-24s-10.7-24-24-24z" />
    </svg>
);

// Define animation keyframes for auto-scrolling and new animations
const styles = `
@keyframes scroll-reviews {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-scroll-reviews {
  animation: scroll-reviews 30s linear infinite;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScaleUp {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-up {
  animation: slideInUp 0.8s ease-out forwards;
}

.animate-fade-in-scale-up {
  animation: fadeInScaleUp 0.8s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}
`;

interface Review {
    name: string;
    role: string;
    comment: string;
}

const testimonials: Review[] = [
    {
        name: "Nguyễn Thu Hà",
        role: "Phụ huynh",
        comment: "Tìm gia sư cho con thật dễ dàng và yên tâm. Quy trình xác thực và đánh giá minh bạch giúp tôi tin tưởng hơn rất nhiều.",
    },
    {
        name: "Lê Văn Tùng",
        role: "Gia sư",
        comment: "Sutido giúp tôi kết nối với học viên phù hợp một cách nhanh chóng. Giao diện dễ dùng và việc thanh toán rất rõ ràng.",
    },
    {
        name: "Phạm Minh An",
        role: "Học viên",
        comment: "Tôi thích cách Sutido giúp tôi tìm được thầy giáo tận tâm, chất lượng. Việc học trở nên hiệu quả và thú vị hơn.",
    },
    {
        name: "Trần Thị Lan",
        role: "Phụ huynh",
        comment: "Con tôi đã cải thiện đáng kể điểm số môn Toán sau khi học với gia sư trên Sutido. Rất hài lòng với dịch vụ!",
    },
    {
        name: "Vũ Thành Đạt",
        role: "Gia sư",
        comment: "Tôi có thể quản lý lịch dạy và thu nhập của mình một cách chuyên nghiệp. Sutido là nền tảng tuyệt vời cho nghề nghiệp của tôi.",
    },
    {
        name: "Hoàng Minh Quân",
        role: "Học viên",
        comment: "Hệ thống tìm kiếm gia sư rất thông minh, giúp tôi nhanh chóng tìm được người phù hợp với nhu cầu học tập của mình.",
    },
];

const HowItWorksCard = ({ title, description, icon, animationClass }: { title: string; description: string; icon: React.ReactNode; animationClass: string }) => (
    <div className={`flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl ${animationClass}`}>
        <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const TestimonialCard = ({ name, role, comment }: Review) => (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex-shrink-0 w-[300px] sm:w-[400px] flex flex-col items-center text-center">
        <p className="text-gray-700 italic text-lg mb-4">"{comment}"</p>
        <div className="font-semibold text-gray-800">{name}</div>
        <div className="text-blue-600 text-sm">{role}</div>
    </div>
);

const FeatureCard = ({ title, description, icon, animationClass }: { title: string; description: string; icon: React.ReactNode; animationClass: string }) => (
    <div className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all hover:scale-105 ${animationClass}`}>
        <div className="text-blue-600 mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const HomePage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Intersection Observer for sections
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, threshold: 0.5 });
    const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.5 });
    const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.5 });
    const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-50">
            {/* CSS is directly injected here to avoid import errors */}
            <style>{styles}</style>
            {/* Header/Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="text-3xl font-bold text-blue-900">Sutido</div>

                    <nav className="hidden lg:flex items-center space-x-8 text-lg">
                        {/* <Link to='/trangchu' className="text-gray-700 hover:text-blue-600 transition-colors">Tìm gia sư</Link> */}
                        {/* <Link to='/dangky-lamgiasu' className="text-gray-700 hover:text-blue-600 transition-colors">Trở thành gia sư</Link> */}
                        {/* <Link to='' className="text-gray-700 hover:text-blue-600 transition-colors">Tài liệu học tập</Link> */}
                        <Link to='/login' className="text-gray-700 hover:text-blue-600 transition-colors">Đăng nhập/Đăng ký</Link>
                        <Link to='/login' className="px-6 py-3 font-semibold text-white bg-blue-900 rounded-full hover:bg-blue-700 transition-colors shadow-md">
                            Bắt đầu ngay
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {
                    isMenuOpen && (
                        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
                            <nav className="flex flex-col items-center space-y-4 text-lg">
                                <a href="#" className="w-full text-center py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-100">Tìm gia sư</a>
                                <a href="#" className="w-full text-center py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-100">Trở thành gia sư</a>
                                <a href="#" className="w-full text-center py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-100">Tài liệu học tập</a>
                                <a href="#" className="w-full text-center py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-100">Đăng nhập/Đăng ký</a>
                                <Link to='/login' className="w-full px-6 py-3 font-semibold text-white bg-blue-900 rounded-full hover:bg-blue-700 transition-colors">
                                    Bắt đầu ngay
                                </Link>
                            </nav>
                        </div>
                    )
                }
            </header >

            <main>
                {/* Hero Section */}
                <section ref={heroRef} className={`bg-blue-50 py-16 sm:py-24`}>
                    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between transition-all duration-1000 ease-out ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-center lg:text-left mb-12 lg:mb-0 lg:w-1/2">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-4">
                                Kết nối gia sư & phụ huynh dễ dàng và minh bạch
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 mb-8">
                                Sutido giúp bạn tìm gia sư chất lượng với quy trình xác thực rõ ràng, bảo đảm an toàn & hiệu quả.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to='/login' className="px-8 py-4 font-semibold text-white bg-blue-900 rounded-full shadow-lg hover:bg-blue-700 transition-colors text-lg">
                                    Tìm gia sư
                                </Link>
                                <Link to='/login' className="px-8 py-4 font-semibold text-blue-900 bg-white rounded-full border-2 border-blue-900 shadow-lg hover:bg-blue-100 transition-colors text-lg">
                                    Trở thành gia sư
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="bg-gray-200 h-64 sm:h-80 w-full lg:w-3/4 rounded-3xl shadow-xl flex items-center justify-center text-gray-500">
                                <img src={imageTutor} alt="Hero Image" className="h-full w-full object-cover rounded-3xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section ref={howItWorksRef} className={`py-16 sm:py-24 bg-white`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className={`text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12 transform transition-all duration-1000 ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Quy trình đơn giản</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <HowItWorksCard
                                title="Đăng ký & Xác thực"
                                description="Tạo tài khoản và xác thực thông tin cá nhân của bạn một cách an toàn và nhanh chóng."
                                icon={<AntAcademicIcon />}
                                animationClass={howItWorksInView ? 'animate-slide-in-up' : 'opacity-0'}
                            />
                            <HowItWorksCard
                                title="Đăng bài tìm kiếm"
                                description="Đăng tin tìm gia sư/học viên với các yêu cầu cụ thể về môn học, trình độ và thời gian."
                                icon={<AntSearchIcon />}
                                animationClass={howItWorksInView ? 'animate-slide-in-up' : 'opacity-0'}
                            />
                            <HowItWorksCard
                                title="Đặt cọc an toàn"
                                description="Hệ thống đảm bảo thanh toán an toàn. Bạn có thể trò chuyện trực tiếp với đối phương trước khi bắt đầu."
                                icon={<AntTeamIcon />}
                                animationClass={howItWorksInView ? 'animate-slide-in-up' : 'opacity-0'}
                            />
                            <HowItWorksCard
                                title="Theo dõi & Đánh giá"
                                description="Theo dõi tiến độ buổi học, nhận phản hồi và đánh giá chất lượng để cải thiện."
                                icon={<AntAcademicIcon />}
                                animationClass={howItWorksInView ? 'animate-slide-in-up' : 'opacity-0'}
                            />
                        </div>
                    </div>
                </section>

                {/* Features / Benefits */}
                <section ref={featuresRef} className={`py-16 sm:py-24 bg-blue-50`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className={`text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12 transform transition-all duration-1000 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Lợi ích vượt trội</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                title="Dành cho phụ huynh"
                                description="Tìm kiếm gia sư chất lượng, được xác thực rõ ràng, giúp con bạn tiến bộ nhanh chóng."
                                icon={<AntAcademicIcon className="h-12 w-12" />}
                                animationClass={featuresInView ? 'animate-fade-in-scale-up' : 'opacity-0'}
                            />
                            <FeatureCard
                                title="Dành cho gia sư"
                                description="Mở rộng mạng lưới học viên, tăng thu nhập và xây dựng thương hiệu cá nhân đáng tin cậy."
                                icon={<AntTeamIcon className="h-12 w-12" />}
                                animationClass={featuresInView ? 'animate-fade-in-scale-up' : 'opacity-0'}
                            />
                            <FeatureCard
                                title="Điểm thưởng & Ưu đãi"
                                description="Tích lũy điểm thưởng khi sử dụng dịch vụ và nhận các ưu đãi độc quyền từ Sutido."
                                icon={<AntSearchIcon className="h-12 w-12" />}
                                animationClass={featuresInView ? 'animate-fade-in-scale-up' : 'opacity-0'}
                            />
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section ref={testimonialsRef} className={`py-16 sm:py-24 bg-white ${testimonialsInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className={`text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12 transform transition-all duration-1000 ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Khách hàng nói gì về chúng tôi</h2>
                        <div className="relative overflow-hidden w-full"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}>
                            <div className="flex space-x-8 animate-scroll-reviews w-[200%]" style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
                                {testimonials.map((review, index) => (
                                    <TestimonialCard key={`first-${index}`} {...review} />
                                ))}
                                {testimonials.map((review, index) => (
                                    <TestimonialCard key={`second-${index}`} {...review} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section ref={ctaRef} className={`py-12 bg-blue-900 text-white text-center transform transition-all duration-1000 ease-out ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold mb-4">Bắt đầu hành trình học tập cùng Sutido ngay hôm nay</h2>
                        <p className="text-xl opacity-80 mb-8">Tìm gia sư phù hợp hoặc bắt đầu sự nghiệp giảng dạy của bạn.</p>
                        <Link to='/login' className="px-10 py-4 font-bold text-blue-900 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg text-lg">
                            Tham gia ngay
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}

        </div >
    );
};

export default HomePage;
