import i18n from 'i18next';
import { initReactI18next } from "react-i18next"


i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: "en",
        debug: true,
        resources: {
            en: {
                translation: {
                    shared: {
                        navBar: {
                            "profile": "View Profile",
                            "logout": "Logout",
                            "signup": "Signup",
                            "login": "Login",
                            ul: {
                                "browse": "Browse",
                                "jobs": "Jobs",
                                "home": "Home",
                                "companies": "Companies"
                            }
                        },
                        footer: {
                            "rights": "© 2024 JobPortal. All rights reserved."
                        }
                    },

                    home: {
                        heroSection: {
                            "hunt": "This is not a real platform!",
                            "title": "Search, Apply, & Get Your Dream Job",
                            "description": "Your go-to platform for job searching and finding the right talent. Discover opportunities and kickstart your career journey with us",
                            "inputPlaceholder": "Find Your Dream Jobs"
                        },
                        latestJobs: {
                            "title": "Latest & Top Job Opening",
                        }
                    },

                    jobs: {
                        filterCard: {
                            "title": "Filter Jobs",
                            "location": "Location",
                            "industry": "Industry"
                        },
                        jobCard: {
                            "days": "Days Ago",
                            "today": "Today",
                            "save": "Save For Later",
                            "details": "Details",
                        },
                        jobDesc: {
                            "back": 'back',
                            "apply": "Apply Now",
                            "applied": "Already Applied",
                            "role": "Role",
                            "location": "Location",
                            "description": "Description",
                            "experience": "Experience",
                            "salary": "Salary",
                            "totalApplicants": "Total Applicants",
                            'postedDate': "Posted Date"
                        }
                    },

                    browse: {
                        "back": "Back",
                        "searchResult": "Search Result",
                        "noResultFound": "No Result Found!"
                    },

                    profile: {
                        "skills": "Skills",
                        "resume": "Resume",
                        "appliedJobs": "Applied Jobs",
                        "jobRole": "Job Role",
                        "company": "Company",
                        "date": "Date",
                        "status": "Status",
                        "pending": "pending",
                        "accepted": "accepted",
                        "rejected": "rejected",
                        'tableMessage': "A list of your recent jobs",
                        updateProfile: {
                            "title": "Update Profile",
                            "name": "Name",
                            "email": 'Email',
                            'number': "Number",
                            "bio": "Bio",
                            "skills": "Skills",
                            "resume": "Resume",
                            "update": "Update"
                        }
                    },

                    auth: {
                        signup: {
                            'title': "Sign Up",
                            "button": "Sign up",
                            "askAccount": "Already have an account",
                            required: {
                                "fullName": "Full Name is Required",
                                "email": "Email is Required",
                                "emailFormat": "Invalid Email Format",
                                "phoneNumber": "Phone Number Uncorrected",
                                "password": "Password must be at least 6 characters",
                                "profile": "Profile is Required",
                                'role': "Role I Required"
                            },
                            label: {
                                "fullName": "Full Name",
                                "email": "Email",
                                "phoneNumber": "Phone Number",
                                "password": "Password",
                                "profile": "Profile",
                                "roleMessage": "Continue As",
                                role: {
                                    "recruiter": "Recruiter",
                                    "student": "Student"
                                }
                            }
                        },
                        login: {
                            'title': "Login",
                            "button": "Login",
                            "askAccount": "Don't have an account?",
                            required: {
                                "email": "Email is Required!",
                                "password": "Password is Required!",
                                "role": "Role is Required!"
                            },
                            label: {
                                "email": "Email",
                                "password": "Password",
                                role: {
                                    "recruiter": "Recruiter",
                                    "student": "Student"
                                }
                            }
                        }
                    }
                }
            },

            ar: {
                translation: {
                    shared: {
                        navBar: {
                            "profile": "الملف الشخصي",
                            "logout": "تسجيل خروج",
                            "signup": "اشتراك",
                            "login": "تسجيل",
                            ul: {
                                "browse": "تصفح",
                                "jobs": "وظائف",
                                "home": "الرئيسية",
                                "companies": "الشركات"
                            }
                        },
                        footer: {
                            "rights": "© 2024 JobPortal جميع الحقوق محفوظة",
                        }
                    },

                    home: {
                        heroSection: {
                            "hunt": "هذه ليست منصة حقيقية!",
                            "title": "بحث, قبول, & العثور على وظائف احلامك",
                            "description": "منصتك المثالية للبحث عن الوظائف أو العثور على المواهب المناسبة. اكتشف الفرص، وابدأ رحلتك المهنية معنا !",
                            "inputPlaceholder": "اعثر على وظيفة احلامك"
                        },
                        latestJobs: {
                            "title": "أحدث & أفضل الوظائف الشاغرة"
                        }
                    },

                    jobs: {
                        filterCard: {
                            "title": "بحث متقدم",
                            "location": "موقع",
                            "industry": "عنوان الوظيفة"
                        },
                        jobCard: {
                            "days": "منذ يوم",
                            "today": "اليوم",
                            "save": "حفظ",
                            "details": "تفاصيل"
                        },
                        jobDesc: {
                            "back": 'عودة',
                            "apply": "تقديم الان",
                            "applied": "تم بالفعل",
                            "role": "التخصص",
                            "location": "الموقع",
                            "description": "وصف",
                            "experience": "خبرة",
                            "salary": "مرتب",
                            "totalApplicants": "عدد المتقدمين",
                            'postedDate': "تاريخ النشر"
                        }
                    },

                    browse: {
                        "back": "عودة",
                        "searchResult": "نتائج البحث",
                        "noResultFound": "لم يتم العثور على اي نتائج"
                    },

                    profile: {
                        "skills": "المهارات",
                        "resume": "السيرة الذاتية",
                        "appliedJobs": "الوظائف المقدم اليها",
                        "jobRole": "تخصص",
                        "company": "شركة",
                        "date": "تاريخ",
                        "status": "الحالة",
                        "pending": "انتظار",
                        "accepted": "موافق",
                        "rejected": "رفض",
                        'tableMessage': "قائمة بالوظائف المقدم عليها مؤخرا",
                        updateProfile: {
                            "title": "تحديث  معلوماتك",
                            "name": "الاسم",
                            "email": 'بريد',
                            'number': "رقم الهاتف",
                            "bio": "وصف",
                            "skills": "مهارات",
                            "resume": "سيرة ثاتية",
                            "update": "تحديث"
                        }
                    },

                    auth: {
                        signup: {
                            "title": "الاشتراك",
                            "button": "اشتراك",
                            "askAccount": "هل لديك حساب بالفعل",
                            required: {
                                "fullName": "الاسم الكامل مطلوب!",
                                "email": "البردي الاكتروني مطلوب!",
                                "emailFormat": "بنية البريد الاكتروني غير صحيحة!",
                                "phoneNumber": "رقم الهاتف غير صحيح!",
                                "password": "يجب ان تحتوي كلمة المرور على 6 احرف على الاقل!",
                                "profile": "الصورة الشخصية مطلوبة!",
                                "role": "حالة المستخدم مطلوبة!"
                            },
                            label: {
                                "fullName": "الاسم الكامل",
                                "email": "البريد الاكتروني",
                                "phoneNumber": "رقم الهاتف",
                                "password": "كلمة المرور",
                                "profile": "الصور الشخصية",
                                "roleMessage": "استمرار ك",
                                role: {
                                    "recruiter": "مسؤول",
                                    "student": "طالب"
                                }
                            }
                        },
                        login: {
                            'title': "تسجيل دخول",
                            "button": "تسجيل دخول",
                            "askAccount": "ليس لديك حساب؟",
                            required: {
                                "email": "البريد الاكتروني مطلوب!",
                                "password": "كلمة المرور مطلوبة!",
                                "role": "حالة المستخدم مطلوبة!"
                            },
                            label: {
                                "email": "البريد الاكتروني",
                                "password": "كلمة المرور",
                                role: {
                                    "recruiter": "مسؤول",
                                    "student": "طالب"
                                }
                            }
                        }
                    }
                }
            }
        }
    });
export default i18n