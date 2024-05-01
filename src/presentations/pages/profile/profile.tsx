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
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { ProfileImg } from "@/shared";
import { updateUser } from "@/stores";

type AlertType = "error" | "success" | "info" | "warning" | "loading";

interface AlertMessage {
  message: string;
  type: AlertType;
}

export function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const dispatch = useAppDispatch();

  const [profileImage, setProfileImage] = useState<string>(ProfileImg);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<AlertMessage[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (userProfileInfo) {
      setName(userProfileInfo.name)
      setEmail(userProfileInfo.email)
    }
  }, [userProfileInfo])

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (alertMessage) {
      timer = setTimeout(() => {
        setAlertMessage([]);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [alertMessage]);

  const addAlertMessage = (message: string, type: AlertType) => {
    setAlertMessage([...alertMessage, { message, type}]);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addAlertMessage("A imagem selecionada excede o limite de tamanho de 5MB.", "error")
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setSelectedFileName(file.name);

      try {
        const resizedImage = await resizeImage(file, 315, 315);
        setProfileImage(resizedImage);
        setAlertMessage([]);
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

  const handleSaveProfile = async () => {
    if (name && email && basicUserInfo) {
      try {
        await dispatch(
          updateUser({
            userId: basicUserInfo.id,
            data: { name: name, email: email }
          })
        ).unwrap();
        addAlertMessage("Perfil atualizado com sucesso!", "success");
      } catch (e) {
        console.error(e);
      }
    } else {
      // Show an error message.
    }
  };

  return (
    <Flex justifyContent="">
      <Flex maxW="1200px">
        <Box flex="2">
          <Box borderWidth="1px" borderRadius="lg" p="4" bg="white" boxShadow="md">
            <Box fontWeight="bold" mb="4" color="blue.600">Foto de Perfil</Box>
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
                {selectedFileName ? `Selected File: ${selectedFileName}` : "Até 5MB para JPG/PNG"}
              </Box>
              <Button colorScheme="blue" variant="outline" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Carregar nova imagem</Button>
            </Flex>
            <br /><br />
            {alertMessage.map((alert, index) => (
              <Alert status={alert.type} key={index} position="fixed" bottom="16px" right="16px" width="auto" >
                <AlertIcon />
                <AlertTitle mr={10}>{alert.message}</AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setAlertMessage([])} />
              </Alert>
            ))}
            <Box fontWeight="bold" mb="4" color="blue.600">Detalhes da Conta</Box>
            <form>
              <Flex mb="4">
                <Box flex="1" mr="2">
                  <FormControl>
                    <FormLabel htmlFor="inputName" fontSize="sm">Nome Completo</FormLabel>
                    <Input
                      id="inputName"
                      type="text"
                      placeholder="Digite seu nome completo"
                      bg="gray.100"
                      border="none"
                      _hover={{ bg: "gray.200" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </Flex>
              <FormControl mb="4">
                <FormLabel htmlFor="inputEmailAddress" fontSize="sm">E-mail</FormLabel>
                <Input
                  id="inputEmailAddress"
                  type="email"
                  placeholder="Digite seu e-mail"
                  bg="gray.100"
                  border="none"
                  _hover={{ bg: "gray.200" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button
                onClick={handleSaveProfile}
                bg={'blue.400'}
                color={'white'}
                loadingText="Submitting"
                _hover={{
                  bg: 'blue.500',
                }}>
                Salvar mudanças
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
