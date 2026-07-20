import { useState } from "react";
import { useThemeMode } from "../../context/ThemeContext";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import {
  FaBell,
  FaBuilding,
  FaFloppyDisk,
  FaGear,
  FaPalette,
  FaShieldHalved,
} from "react-icons/fa6";

const initialHotelSettings = {
  hotelName: "Grand Palace Hotel",
  email: "info@grandpalacehotel.com",
  phone: "0212 555 44 33",
  address: "İstanbul, Türkiye",
  checkInTime: "14:00",
  checkOutTime: "12:00",
  currency: "TRY",
  language: "tr",
};

const initialNotificationSettings = {
  newReservation: true,
  cancellation: true,
  housekeepingCompleted: true,
  lowRoomAvailability: true,
  emailNotifications: true,
  smsNotifications: false,
};

const initialSystemSettings = {
  darkMode: false,
  compactMenu: false,
  automaticBackup: true,
  twoFactorAuthentication: false,
};

function SettingsSection({ icon, title, description, children }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2,
            sm: 3,
          },

          "&:last-child": {
            pb: {
              xs: 2,
              sm: 3,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            mb: 3,
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
              color: "primary.main",
              backgroundColor: "primary.light",
              fontSize: 18,
            }}
          >
            {icon}
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                color: "text.secondary",
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        {children}
      </CardContent>
    </Card>
  );
}

function Settings() {
  const { isDarkMode, setThemeMode } = useThemeMode();
  
  const [hotelSettings, setHotelSettings] = useState(
    initialHotelSettings,
  );

  const [notificationSettings, setNotificationSettings] = useState(
    initialNotificationSettings,
  );

  const [systemSettings, setSystemSettings] = useState(
    initialSystemSettings,
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleHotelSettingsChange = (event) => {
    const { name, value } = event.target;

    setHotelSettings((currentSettings) => ({
      ...currentSettings,
      [name]: value,
    }));
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;

    setNotificationSettings((currentSettings) => ({
      ...currentSettings,
      [name]: checked,
    }));
  };

  const handleSystemSettingsChange = (event) => {
    const { name, checked } = event.target;

    setSystemSettings((currentSettings) => ({
      ...currentSettings,
      [name]: checked,
    }));
  };

  const handleSaveSettings = () => {
    const settings = {
      hotel: hotelSettings,
      notifications: notificationSettings,
      system: systemSettings,
    };

    localStorage.setItem(
      "hotelManagementSettings",
      JSON.stringify(settings),
    );

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
            }}
          >
            Ayarlar
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.75,
              color: "text.secondary",
            }}
          >
            Otel bilgilerini ve sistem tercihlerini yönetin.
          </Typography>
        </Box>

        <Button
          type="button"
          variant="contained"
          startIcon={<FaFloppyDisk />}
          onClick={handleSaveSettings}
          sx={{
            minHeight: 42,
            px: 2.5,
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Ayarları Kaydet
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            xl: "minmax(0, 1.5fr) minmax(320px, 1fr)",
          },
          gap: 2.5,
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <SettingsSection
            icon={<FaBuilding />}
            title="Otel Bilgileri"
            description="Otelinizin temel iletişim ve çalışma bilgilerini düzenleyin."
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              <TextField
                label="Otel Adı"
                name="hotelName"
                value={hotelSettings.hotelName}
                onChange={handleHotelSettingsChange}
                fullWidth
              />

              <TextField
                label="E-posta"
                name="email"
                type="email"
                value={hotelSettings.email}
                onChange={handleHotelSettingsChange}
                fullWidth
              />

              <TextField
                label="Telefon"
                name="phone"
                value={hotelSettings.phone}
                onChange={handleHotelSettingsChange}
                fullWidth
              />

              <TextField
                label="Adres"
                name="address"
                value={hotelSettings.address}
                onChange={handleHotelSettingsChange}
                fullWidth
              />

              <TextField
                label="Giriş Saati"
                name="checkInTime"
                type="time"
                value={hotelSettings.checkInTime}
                onChange={handleHotelSettingsChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />

              <TextField
                label="Çıkış Saati"
                name="checkOutTime"
                type="time"
                value={hotelSettings.checkOutTime}
                onChange={handleHotelSettingsChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel id="currency-label">
                  Para Birimi
                </InputLabel>

                <Select
                  labelId="currency-label"
                  name="currency"
                  value={hotelSettings.currency}
                  label="Para Birimi"
                  onChange={handleHotelSettingsChange}
                >
                  <MenuItem value="TRY">
                    Türk Lirası (₺)
                  </MenuItem>

                  <MenuItem value="USD">
                    Amerikan Doları ($)
                  </MenuItem>

                  <MenuItem value="EUR">
                    Euro (€)
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="language-label">
                  Sistem Dili
                </InputLabel>

                <Select
                  labelId="language-label"
                  name="language"
                  value={hotelSettings.language}
                  label="Sistem Dili"
                  onChange={handleHotelSettingsChange}
                >
                  <MenuItem value="tr">Türkçe</MenuItem>
                  <MenuItem value="en">İngilizce</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </SettingsSection>

          <SettingsSection
            icon={<FaBell />}
            title="Bildirim Ayarları"
            description="Hangi işlemlerde bildirim almak istediğinizi seçin."
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    name="newReservation"
                    checked={notificationSettings.newReservation}
                    onChange={handleNotificationChange}
                  />
                }
                label="Yeni rezervasyon bildirimi"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />

              <Divider />

              <FormControlLabel
                control={
                  <Switch
                    name="cancellation"
                    checked={notificationSettings.cancellation}
                    onChange={handleNotificationChange}
                  />
                }
                label="Rezervasyon iptal bildirimi"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />

              <Divider />

              <FormControlLabel
                control={
                  <Switch
                    name="housekeepingCompleted"
                    checked={
                      notificationSettings.housekeepingCompleted
                    }
                    onChange={handleNotificationChange}
                  />
                }
                label="Temizlik tamamlandı bildirimi"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />

              <Divider />

              <FormControlLabel
                control={
                  <Switch
                    name="lowRoomAvailability"
                    checked={
                      notificationSettings.lowRoomAvailability
                    }
                    onChange={handleNotificationChange}
                  />
                }
                label="Düşük oda müsaitliği uyarısı"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />
            </Box>
          </SettingsSection>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <SettingsSection
            icon={<FaPalette />}
            title="Görünüm Ayarları"
            description="Yönetim panelinin görünüm tercihlerini düzenleyin."
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControlLabel
                control={
                <Switch
                 checked={isDarkMode}
                  onChange={(event) =>
                    setThemeMode(event.target.checked ? "dark" : "light")
                 }
            />
                }
                label="Karanlık mod"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />

              <Divider />

              <FormControlLabel
                control={
                  <Switch
                    name="compactMenu"
                    checked={systemSettings.compactMenu}
                    onChange={handleSystemSettingsChange}
                  />
                }
                label="Kompakt menü"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />
            </Box>
          </SettingsSection>

          <SettingsSection
            icon={<FaGear />}
            title="Sistem Ayarları"
            description="Yedekleme ve bildirim kanallarını yönetin."
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    name="automaticBackup"
                    checked={systemSettings.automaticBackup}
                    onChange={handleSystemSettingsChange}
                  />
                }
                label="Otomatik yedekleme"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />

              <Divider />

              <FormControlLabel
                control={
                  <Switch
                    name="emailNotifications"
                    checked={
                      notificationSettings.emailNotifications
                    }
                    onChange={handleNotificationChange}
                  />
                }
                label="E-posta bildirimleri"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />

              <Divider />

              <FormControlLabel
                control={
                  <Switch
                    name="smsNotifications"
                    checked={
                      notificationSettings.smsNotifications
                    }
                    onChange={handleNotificationChange}
                  />
                }
                label="SMS bildirimleri"
                sx={{
                  minHeight: 48,
                  m: 0,
                  justifyContent: "space-between",

                  "& .MuiFormControlLabel-label": {
                    fontWeight: 500,
                  },
                }}
                labelPlacement="start"
              />
            </Box>
          </SettingsSection>

          <SettingsSection
            icon={<FaShieldHalved />}
            title="Güvenlik"
            description="Hesabınız için ek güvenlik seçeneklerini yönetin."
          >
            <FormControlLabel
              control={
                <Switch
                  name="twoFactorAuthentication"
                  checked={
                    systemSettings.twoFactorAuthentication
                  }
                  onChange={handleSystemSettingsChange}
                />
              }
              label="İki aşamalı doğrulama"
              sx={{
                minHeight: 48,
                m: 0,
                justifyContent: "space-between",

                "& .MuiFormControlLabel-label": {
                  fontWeight: 500,
                },
              }}
              labelPlacement="start"
            />

            <Alert
              severity="info"
              sx={{
                mt: 2,
                borderRadius: 2.5,
              }}
            >
              İki aşamalı doğrulama, hesabınıza ek bir güvenlik katmanı
              ekler.
            </Alert>
          </SettingsSection>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleSnackbarClose}
          sx={{
            width: "100%",
            borderRadius: 2.5,
          }}
        >
          Ayarlar başarıyla kaydedildi.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Settings;