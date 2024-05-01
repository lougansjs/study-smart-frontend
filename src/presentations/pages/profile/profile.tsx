import { 
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";

export function Profile() {
  const [profileImage, setProfileImage] = useState<string>("http://bootdey.com/img/Content/avatar/avatar1.png");
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (alertMessage) {
      timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [alertMessage]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAlertMessage("A imagem selecionada excede o limite de tamanho de 5MB.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setSelectedFileName(file.name);

      try {
        const resizedImage = await resizeImage(file, 315, 315);
        setProfileImage(resizedImage);
        setAlertMessage("");
      } catch (error) {
        console.error("Erro ao redimensionar imagem:", error);
      }
    }
  };

  const resizeImage = (file: File, width: number, height: number): Promise<string> => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri as string);
        },
        "base64",
        width,
        height
      );
    });
  };

  return (
    <Flex justifyContent="">
      <Flex maxW="1200px">
        <Box flex="2">
          <Box borderWidth="1px" borderRadius="lg" p="4" bg="white" boxShadow="md">
            <Box fontWeight="bold" mb="4" color="blue.600">Profile Picture</Box>
            <Flex direction="column" alignItems="center">
              <input
                type="file"
                accept="image/*"
                id="upload-button"
                style={{ display: "none" }}
                ref={fileInputRef}
                onInput={handleImageUpload}
              />
              <label htmlFor="upload-button">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={profileImage}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </label>
              <Box fontSize="sm" fontStyle="italic" color="gray.500" mb="4">
                {selectedFileName ? `Selected File: ${selectedFileName}` : "JPG or PNG no larger than 5 MB"}
              </Box>
              <Button colorScheme="blue" variant="outline" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Upload new image</Button>
            </Flex>
            <br /><br />
            {alertMessage && (
              <Alert status="error" position="fixed" bottom="16px" right="16px" width="30%" >
                <AlertIcon />
                <AlertTitle mr={2}>{alertMessage}</AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setAlertMessage("")} />
              </Alert>
            )}
            <Box fontWeight="bold" mb="4" color="blue.600">Account Details</Box>
            <form>
              <FormControl mb="4">
                <FormLabel htmlFor="inputUsername" fontSize="sm">Username (how your name will appear to other users on the site)</FormLabel>
                <Input
                  id="inputUsername"
                  type="text"
                  placeholder="Enter your username"
                  bg="gray.100"
                  border="none"
                  _hover={{ bg: "gray.200" }}
                />
              </FormControl>
              <Flex mb="4">
                <Box flex="1" mr="2">
                  <FormControl>
                    <FormLabel htmlFor="inputFirstName" fontSize="sm">First name</FormLabel>
                    <Input
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      bg="gray.100"
                      border="none"
                      _hover={{ bg: "gray.200" }}
                    />
                  </FormControl>
                </Box>
                <Box flex="1" ml="2">
                  <FormControl>
                    <FormLabel htmlFor="inputLastName" fontSize="sm">Last name</FormLabel>
                    <Input
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      bg="gray.100"
                      border="none"
                      _hover={{ bg: "gray.200" }}
                    />
                  </FormControl>
                </Box>
              </Flex>
              <FormControl mb="4">
                <FormLabel htmlFor="inputEmailAddress" fontSize="sm">Email address</FormLabel>
                <Input
                  id="inputEmailAddress"
                  type="email"
                  placeholder="Enter your email address"
                  bg="gray.100"
                  border="none"
                  _hover={{ bg: "gray.200" }}
                />
              </FormControl>
              <Button colorScheme="blue" variant="solid" type="submit">Save changes</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
