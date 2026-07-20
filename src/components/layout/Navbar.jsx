import { useLocation, useNavigate } from "react-router-dom";
import { useThemeMode } from "../../context/ThemeContext";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  FaMagnifyingGlass,
  FaMoon,
  FaRightFromBracket,
  FaBars,
  FaBell,
  FaSun,
  FaUser,
} from "react-icons/fa6";

import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  "/dashboard": "Gösterge Paneli",
  "/rooms": "Odalar",
  "/housekeeping": "Kat Hizmetleri",
  "/staff": "Personeller",
  "/reports": "Raporlar",
  "/settings": "Ayarlar",
  "/guests": "Misafirler",
};

function Navbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useThemeMode();

  const pageTitle =
    pageTitles[location.pathname] || "Otel Yönetimi";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 10,
        color: "text.primary",
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: 70,
            md: 82,
          },
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          px: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <IconButton
            type="button"
            onClick={onMenuClick}
            aria-label="Menüyü aç"
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 2.5,
              backgroundColor: "action.hover",

              "&:hover": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <FaBars size={18} />
          </IconButton>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: 18,
                  sm: 21,
                },
              }}
            >
              {pageTitle}
            </Typography>

            <Typography
              variant="body2"
              noWrap
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                mt: 0.25,
                color: "text.secondary",
                fontSize: 13,
              }}
            >
              {user?.hotelName
                ? `${user.hotelName} yönetim paneli`
                : "Otel yönetim sistemine hoş geldiniz."}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: {
              xs: 0.5,
              sm: 1,
              md: 1.5,
            },
          }}
        >
          <TextField
            size="small"
            placeholder="Ara..."
            aria-label="Panelde ara"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaMagnifyingGlass size={15} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
              width: 230,

              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor: "action.hover",
              },
            }}
          />

         <Tooltip
  title={
    isDarkMode
      ? "Açık temaya geç"
      : "Koyu temaya geç"
  }
>
  <IconButton
    type="button"
    onClick={toggleTheme}
    aria-label="Temayı değiştir"
    sx={{
      width: 42,
      height: 42,
      borderRadius: 2.5,
      backgroundColor: "action.hover",

      "&:hover": {
        backgroundColor: "action.selected",
      },
    }}
  >
    {isDarkMode ? (
      <FaSun size={18} />
    ) : (
      <FaMoon size={17} />
    )}
  </IconButton>
</Tooltip>
          <Tooltip title="Bildirimler">
            <IconButton
              aria-label="Bildirimler"
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                backgroundColor: "action.hover",

                "&:hover": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <FaBell size={17} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
              gap: 1,
              ml: 0.5,
            }}
          >
            <Avatar
              src={user?.logo || undefined}
              alt={user?.hotelName || "Otel logosu"}
              sx={{
                width: 40,
                height: 40,
                color: "primary.main",
                backgroundColor: "primary.light",
              }}
            >
              {!user?.logo && <FaUser size={16} />}
            </Avatar>

            <Box
              sx={{
                display: {
                  sm: "none",
                  md: "block",
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {user?.ownerName || "Yönetici"}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                {user?.role === "admin"
                  ? "Yönetici"
                  : user?.role || "Kullanıcı"}
              </Typography>
            </Box>
          </Box>

          <Button
            type="button"
            color="error"
            variant="outlined"
            onClick={handleLogout}
            startIcon={<FaRightFromBracket />}
            sx={{
              minWidth: {
                xs: 42,
                sm: "auto",
              },
              height: 42,
              px: {
                xs: 1.25,
                sm: 2,
              },
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,

              "& .MuiButton-startIcon": {
                m: {
                  xs: 0,
                  sm: "0 8px 0 -4px",
                },
              },
            }}
          >
            <Box
              component="span"
              sx={{
                display: {
                  xs: "none",
                  sm: "inline",
                },
              }}
            >
              Çıkış
            </Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;