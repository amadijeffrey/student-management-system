import { STUDENT_API_URL } from "@/lib/constants";
import { Student } from "@/types/students";

export const fetchStudents = async (query?: string): Promise<Student[]> => {
  const url = query
    ? `${STUDENT_API_URL}?query=${encodeURIComponent(query)}`
    : STUDENT_API_URL;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

export const fetchStudent = async (
  id: string
): Promise<Student | null> => {
  const res = await fetch(`${STUDENT_API_URL}/${id}`);

  if (!res.ok) throw new Error(`Failed to fetch student with id: ${id}`);

  return res.json();
};

export const deleteStudent = async (id: string): Promise<void> => {
  const res = await fetch(`${STUDENT_API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete student");
};

export const addNewStudent = async (data: Student) => {
  const res = await fetch(STUDENT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to add student");
  }

  return res.json();
};

export const updateStudent = async (data: Student, id: string) => {
  const res = await fetch(STUDENT_API_URL + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to add student");
  }

  return res.json();
};
