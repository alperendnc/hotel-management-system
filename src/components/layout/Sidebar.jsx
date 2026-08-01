import { NavLink } from "react-router-dom";

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  FaBed,
  FaBroom,
  FaChartColumn,
  FaGear,
  FaHotel,
  FaCalendarDays,
  FaTableColumns,
  FaUsers,
} from "react-icons/fa6";

import { useAuth } from "../../context/AuthContext";

const drawerWidth = 260;

const menuItems = [
  {
    title: "Gösterge Paneli",
    path: "/dashboard",
    icon: <FaTableColumns />,
  },
  {
    title: "Odalar",
    path: "/rooms",
    icon: <FaBed />,
  },
  {
  title: "Rezervasyonlar",
  path: "/reservations",
  icon: <FaCalendarDays />,
},
  {
    title: "Kat Hizmetleri",
    path: "/housekeeping",
    icon: <FaBroom />,
  },
  {
    title: "Personeller",
    path: "/staff",
    icon: <FaUsers />,
  },
  {
    title: "Raporlar",
    path: "/reports",
    icon: <FaChartColumn />,
  },
  {
    title: "Ayarlar",
    path: "/settings",
    icon: <FaGear />,
  },
  {
    title: "Misafirler",
    path: "/guests",
    icon: <FaUsers />,
  }
];

function SidebarContent({ onNavigate }) {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          minHeight: 82,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2.5,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            borderRadius: 2.5,
            color: "common.white",
            backgroundColor: "primary.main",
            fontSize: 19,
          }}
        >
          <FaHotel />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            Hotel Manager
          </Typography>

          <Typography
            variant="caption"
            noWrap
            sx={{
              display: "block",
              mt: 0.25,
              color: "text.secondary",
            }}
          >
            Yönetim Sistemi
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box
        sx={{
          px: 2,
          py: 2.5,
        }}
      >
        <List
          disablePadding
          sx={{
            display: "grid",
            gap: 0.75,
          }}
        >
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onNavigate}
              sx={{
                minHeight: 48,
                px: 1.75,
                borderRadius: 2.5,
                color: "text.secondary",

                "& .MuiListItemIcon-root": {
                  color: "inherit",
                },

                "&.active": {
                  color: "primary.main",
                  backgroundColor: "action.selected",

                  "&:hover": {
                    backgroundColor: "action.selected",
                  },
                },

                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  fontSize: 18,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.title}
                slotProps={{
                  primary: {
                    fontSize: 14,
                    fontWeight: 700,
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            p: 1.5,
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            backgroundColor: "action.hover",
          }}
        >
          <Avatar
            src={user?.logo || undefined}
            alt={user?.hotelName || "Otel logosu"}
            sx={{
              width: 42,
              height: 42,
              backgroundColor: "primary.light",
              color: "primary.main",
            }}
          >
            {!user?.logo && <FaHotel size={16} />}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              noWrap
              sx={{
                fontWeight: 700,
              }}
            >
              {user?.hotelName || "Otel Hesabı"}
            </Typography>

            <Typography
              variant="caption"
              noWrap
              sx={{
                display: "block",
                color: "text.secondary",
              }}
            >
              {user?.ownerName || "Yönetici"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Sidebar({
  mobileOpen = false,
  onClose,
}) {
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <SidebarContent onNavigate={onClose} />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: 1,
            borderColor: "divider",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}

export default Sidebar;