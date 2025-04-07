import { Box, Button, Flex, Heading, IconButton, Spacer, Stack, Text } from "@chakra-ui/react";
import { useLogin, useLogout, useUser } from "@/lib/auth";
import { Link } from "react-router";
import { ColorModeButton } from "../ui/color-mode";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { Avatar } from "../ui/avatar";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <Box as="footer" boxShadow="md" py={4} textAlign="center" textStyle="sm" margin="auto" w="100%">
      <Text>© {new Date().getFullYear()} Crispy Popcorn. All rights reserved.</Text>
    </Box>
  );
};

const Header = () => {
  const login = useLogin();
  const logout = useLogout();
  const user = useUser();
  return (
    <Box as="header" p={4} boxShadow="md">
      <Flex align="center">
        <Link to="/">
          <Heading size="xl">Crispy Popcorn</Heading>
        </Link>
        <Spacer />
        <ColorModeButton mr={2} />
        <IconButton mr={2} variant="ghost" asChild aria-label="Preferiti">
          <Link to="/favourites">
            <Heart color="red" fill="red" />
          </Link>
        </IconButton>
        {user.data && (
          <MenuRoot positioning={{ placement: "bottom" }}>
            <MenuTrigger>
              <Avatar src={user.data.user_metadata.avatar_url} fallback={user.data.user_metadata.name} />
            </MenuTrigger>
            <MenuContent>
              <MenuItem
                value="logout"
                onClick={() => {
                  logout.mutate({});
                }}>
                Logout
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        )}
        {!user.data && (
          <Button
            variant="solid"
            mr={2}
            onClick={() => {
              login.mutate({});
            }}>
            Log In
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1">
        <Stack direction="column" align="center" justify="center" margin="auto" px={4} py={8}>
          {children}
        </Stack>
      </Box>
      <Footer />
    </Flex>
  );
};
