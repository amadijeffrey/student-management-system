import StudentForm from "@/components/shared/Form";
import { fetchStudent } from "@/services/student-service";

import { Container } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import React from "react";


export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ student_id: string }>;
}) {
  const { student_id } = await params;
  let student = null;

  try {
    student = await fetchStudent(student_id);
  } catch (error) {
    console.error("Failed to fetch student:", error);
    return notFound();
  }

  if (!student) return notFound();

  return (
    <Container maxW="container.md" py={6}>
      <StudentForm initialData={student} />
    </Container>
  );
}