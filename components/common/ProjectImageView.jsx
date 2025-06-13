import { Button } from "@tamagui/button";
import { Pencil, Trash2 } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView } from "react-native";
import { Card, Text, XStack, YStack, useWindowDimensions } from "tamagui";
import { deleteProject } from "../../backend/functions/ProjectsFunction";

const data = Array.from({ length: 50 }).map((_, i) => ({
  no: `${String(i + 1).padStart(2, "0")}`,
  name: i % 2 === 0 ? "Omid Mine Site 1" : "Omid Mine Site 2",
  updated: i % 2 === 0 ? "Updated 16 hrs ago" : "Updated 2 days ago",
  desc:
    i === 0
      ? "This is the image of adcd blast"
      : "This is the image of Omid blast",
}));
const ITEMS_PER_PAGE = 15;
export default function ProjectImageView({
  query,
  projects = [],
  setProjects,
}) {
  const { height } = useWindowDimensions();
  const scrollMaxHeight = height * 0.6;
  const [page, setPage] = useState(1);
  const router = useRouter();
  // console.log(projects);
  const data = projects.map((project, index) => ({
    no: `${String(index + 1).padStart(2, "0")}`,
    name: project.name,
    updated: new Date(project.updated_at).toLocaleString(), // Format if needed
    desc: project.desc,
    id: project.id,
    img_url: project.img_url,
  }));
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toUpperCase())
  );
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  //console.log("PAginated Data:", paginatedData);
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
        flex={1}
      >
        <XStack
          borderRadius="$4"
          overflow="hidden"
          flexDirection="column"
          borderWidth={1}
          borderColor="$borderColor"
          flex={1}
        >
          <YStack flex={1} backgroundColor="$gray2" padding="$4">
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <XStack flexWrap="wrap" justifyContent="space-between" gap="$4">
                {paginatedData.map((item, index) => (
                  <Card
                    key={index}
                    width="30%" // Adjust based on screen size, e.g. 45% for tablets
                    bordered
                    elevate
                    padding="$2"
                    borderRadius="$4"
                    backgroundColor="white"
                  >
                    <YStack>
                      {/* Placeholder image box or replace with actual Image component */}
                      <YStack
                        width="100%"
                        height={250}
                        borderRadius="$4"
                        overflow="hidden"
                        marginBottom="$3"
                      >
                        <Image
                          source={
                            item.img_url?.length > 0
                              ? { uri: JSON.parse(item.img_url)[0] }
                              : require("../../assets/demo.png")
                          }
                          style={{ width: "100%", height: "100%", borderRadius: 8 }}
                          onError={(e) => console.warn("Image failed to load:", JSON.parse(item.img_url)[0], e.nativeEvent.error)}
                          resizeMode="cover"
                        />
                      </YStack>

                      {/* Image Metadata */}
                      <Text fontSize="$4" fontWeight="600" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text fontSize="$2" color="$gray10" marginVertical="$1">
                        {item.updated}
                      </Text>
                      <Text fontSize="$2" color="$gray11" numberOfLines={2}>
                        {item.desc}
                      </Text>

                      {/* Actions */}
                      <XStack marginTop="$3" gap="$2" justifyContent="flex-end">
                        <Button
                          icon={Pencil}
                          size="$2"
                          onPress={() => {
                            router.push({
                              pathname: "/projectView",
                              params: {
                                id: item.no, // or a unique ID
                                name: item.name,
                                desc: item.desc,
                                updated: item.updated,
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
                    </YStack>
                  </Card>
                ))}
              </XStack>
            </ScrollView>

            {/* Pagination */}
            <XStack
              marginTop="$4"
              justifyContent="space-between"
              alignItems="center"
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
          </YStack>
        </XStack>
      </Card>
    </YStack>
  );
}
