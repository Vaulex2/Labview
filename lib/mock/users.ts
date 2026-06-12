import type { User } from "@/lib/types";

export const MOCK_USER: User = {
  id: "usr_001",
  email: "amir.karimov@university.edu",
  phone: "+998901234567",
  studentId: "U2021-ECE-0042",
  firstName: "Amir",
  surname: "Karimov",
  role: "student",
  avatarUrl: undefined,
  enrolledAt: "2024-09-01",
};

export const MOCK_TEACHER: User = {
  id: "usr_002",
  email: "prof.ismoilov@university.edu",
  phone: "+998907654321",
  studentId: "STAFF-001",
  firstName: "Jahongir",
  surname: "Ismoilov",
  role: "teacher",
  enrolledAt: "2022-01-15",
};
