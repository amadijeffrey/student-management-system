'use client'
import { EmptyStateComponent } from "@/components/fallback/EmptyState";
import { FilterEmptyState } from "@/components/fallback/FilterEmptyState";
import { FilterInput } from "@/components/shared/FilterInput";
import { LoadingState } from "@/components/shared/Loaders";
import StudentCard from "@/components/shared/StudentCard";
// import StudentCard from "@/components/shared/StudentCard";
import { toaster } from "@/components/ui/toaster";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchStudents, deleteStudent } from "@/services/student-service";
import { Student } from "@/types/students";

import { Container, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const StudentPage = () => {
  const router = useRouter();

  const [query, setQuery] = React.useState("");
  const [invalidQuery, setInvalidQuery] = React.useState("");
  const [students, setStudents] = React.useState<Student[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);

   const debouncedSearchValue = useDebounce(query, 1000);

  const fetchAndSetStudents = async (query?: string) => {
    setLoading(true);
    try {
      const data = await fetchStudents(query);
      setInvalidQuery(query ?? "");
      setStudents(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAndSetStudents();
  }, []);

    React.useEffect(() => {

    fetchAndSetStudents(debouncedSearchValue?.trim());
  }, [debouncedSearchValue]);


  // Handle clear button
  const handleClearSearch = () => {
    fetchAndSetStudents("");
    setInvalidQuery("");
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toaster.create({ description: "Student deleted", type: "success" });
    } catch (error) {
      toaster.create({ description: "Error deleting student", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Container maxW="container.md" py={6}>
      <Flex
        justify="space-between"
        flexDir={{ base: "column", md: "row" }}
        alignItems={"center"}
        mb={6}
      >
        <Heading
          flex={1}
          size="2xl"
          w={"full"}
          mb={{ base: 2, md: 0 }}
          textAlign={{ base: "center", md: "left" }}
          color={"white"}
        >
          All Students
        </Heading>
        <FilterInput
          handleClear={handleClearSearch}
          query={query}
          setQuery={setQuery}
        />
      </Flex>
      {loading ? (
        <Flex p={4} justify={"center"} alignItems={"center"}>
          <LoadingState />
        </Flex>
      ) : (
        <Stack>
          {students.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} gap={4}>
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onDelete={() => handleDelete(student.id!)}
                  isDeleting={isDeleting}
                />
              ))}
            </SimpleGrid>
          ) : invalidQuery ? (
            <FilterEmptyState text={invalidQuery} />
          ) : (
            <EmptyStateComponent action={() => router.push("/students/new")} />
          )}
        </Stack>
      )}
    </Container>
  );
};

export default StudentPage;