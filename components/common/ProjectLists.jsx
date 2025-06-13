import { Button } from "@tamagui/button";
import { Pencil, Trash2 } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Card, Text, XStack, YStack, useWindowDimensions } from "tamagui";
import { deleteProject } from "../../backend/functions/ProjectsFunction";

const ITEMS_PER_PAGE = 15;

export default function ProjectLists({ query, projects = [], setProjects }) {
  const { height } = useWindowDimensions();
  const scrollMaxHeight = height * 0.6; // Adjusted to 45% of screen height for better responsiveness
  const [page, setPage] = useState(1);
  const router = useRouter();
  // console.log(projects)
  const data = projects.map((project, index) => ({
    no: `${String(index + 1).padStart(2, "0")}`,
    name: project.name,
    updated: new Date(project.updated_at).toLocaleString(), // Format if needed
    desc: project.desc,
    id: project.id,
    img_url: project.img_url,
  }));

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  console.log(paginatedData);

  const handleDelete = async (projectId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this project?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteProject(projectId);
              setProjects((prev) => prev.filter((p) => p.id !== projectId));
            } catch (err) {
              console.error("Failed to delete project:", err);
              alert("Failed to delete project.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <YStack flex={1} backgroundColor="$gray2" padding="$4">
      <Card
        borderRadius="$6"
        backgroundColor="white"
        elevation="$4"
        padding="$4"
      >
        <XStack
          borderRadius="$4"
          overflow="hidden"
          flexDirection="column"
          borderWidth={1}
          borderColor="$borderColor"
        >
          {/* Header */}
          <XStack
            padding="$3"
            backgroundColor="$lightPrimary"
            borderBottomWidth={1}
            borderColor="$borderColor"
          >
            <Text
              flex={1}
              fontWeight="600"
              fontSize="$5"
              color="$darkPrimary"
              backgroundColor="$lightPrimary"
            >
              No.
            </Text>
            <Text
              flex={3}
              fontWeight="600"
              fontSize="$5"
              color="$darkPrimary"
              backgroundColor="$lightPrimary"
            >
              Name
            </Text>
            <Text
              flex={3}
              fontWeight="600"
              fontSize="$5"
              color="$darkPrimary"
              backgroundColor="$lightPrimary"
            >
              Uploaded On
            </Text>
            <Text
              flex={4}
              fontWeight="600"
              fontSize="$5"
              color="$darkPrimary"
              backgroundColor="$lightPrimary"
            >
              Description
            </Text>
            <Text
              flex={2}
              fontWeight="600"
              fontSize="$5"
              color="$darkPrimary"
              backgroundColor="$lightPrimary"
              textAlign="center"
            >
              Actions
            </Text>
          </XStack>

          {/* Rows */}
          <ScrollView style={{ maxHeight: scrollMaxHeight }}>
            {paginatedData.map((item, index) => (
              <XStack
                key={index}
                alignItems="center"
                padding="$3"
                borderBottomWidth={1}
                borderColor="$borderColor"
                backgroundColor="white"
              >
                <Text
                  flex={1}
                  fontSize="$4"
                  color="$textSecondary"
                  backgroundColor="$bg"
                >
                  {item.no}
                </Text>
                <Text
                  flex={3}
                  fontWeight={700}
                  fontSize="$4"
                  color="$primary"
                  backgroundColor="$bg"
                >
                  {item.name}
                </Text>
                <Text
                  flex={3}
                  fontSize="$4"
                  color="$textSecondary"
                  backgroundColor="$bg"
                >
                  {item.updated}
                </Text>
                <Text
                  flex={4}
                  fontSize="$4"
                  color="$textSecondary"
                  backgroundColor="$bg"
                >
                  {item.desc}
                </Text>
                <XStack
                  flex={2}
                  gap="$2"
                  justifyContent="center"
                  paddingRight="$2"
                >
                  <Button
                    icon={Pencil}
                    size="$2"
                    onPress={() => {
                      router.push({
                        pathname: "/projectView",
                        params: {
                          id: item.id, // or a unique ID
                          name: item.name,
                          desc: item.desc,
                          updated: item.updated,
                          img_url: item.img_url,
                        },
                      });
                    }}
                  />
                  <Button
                    icon={Trash2}
                    size="$2"
                    theme="red"
                    onPress={() => handleDelete(item.id)}
                  />
                </XStack>
              </XStack>
            ))}
          </ScrollView>

          {/* Pagination */}
          <XStack
            padding="$3"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor="white"
          >
            <Text color="$textSecondary" fontSize="$4">
              Items per page {ITEMS_PER_PAGE}
            </Text>
            <Text color="$textSecondary" fontSize="$4">
              {`${Math.min(
                (page - 1) * ITEMS_PER_PAGE + 1,
                totalItems
              )} - ${Math.min(
                page * ITEMS_PER_PAGE,
                totalItems
              )} of ${totalItems} Items`}
            </Text>
            <XStack alignItems="center" gap="$2">
              <Button
                size="$2"
                variant="outlined"
                onPress={() => setPage(1)}
                disabled={page === 1}
              >
                <Text>≪</Text>
              </Button>
              <Button
                size="$2"
                variant="outlined"
                onPress={handlePrev}
                disabled={page === 1}
              >
                <Text>‹</Text>
              </Button>
              <Button size="$2" variant="active">
                <Text>{page}</Text>
              </Button>
              <Button
                size="$2"
                variant="outlined"
                onPress={handleNext}
                disabled={page === totalPages}
              >
                <Text>›</Text>
              </Button>
              <Button
                size="$2"
                variant="outlined"
                onPress={() => setPage(totalPages)}
                disabled={page === totalPages}
              >
                <Text>≫</Text>
              </Button>
            </XStack>
          </XStack>
        </XStack>
      </Card>
    </YStack>
  );
}
