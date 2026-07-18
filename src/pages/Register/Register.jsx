import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  FaBed,
  FaBuilding,
  FaCity,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaImage,
  FaLock,
  FaPhone,
  FaUser,
  FaUserPlus,
} from "react-icons/fa6";

const cities = [
  "Adana",
  "Ankara",
  "Antalya",
  "Bursa",
  "İstanbul",
  "İzmir",
  "Muğla",
  "Nevşehir",
  "Trabzon",
];

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hotelName: "",
    ownerName: "",
    email: "",
    phone: "",
    city: "",
    roomCount: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [logo, setLogo] = useState("");
  const [logoName, setLogoName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrorMessage("");
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Lütfen geçerli bir görsel dosyası seçin.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("Logo boyutu en fazla 2 MB olabilir.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setLogo(reader.result);
      setLogoName(file.name);
      setErrorMessage("");
    };

    reader.readAsDataURL(file);
  };

  const createHotelId = () => {
    return `HTL-${Date.now()}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      hotelName,
      ownerName,
      email,
      phone,
      city,
      roomCount,
      password,
      confirmPassword,
      acceptTerms,
    } = formData;

    if (
      !hotelName.trim() ||
      !ownerName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !city ||
      !roomCount ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Şifreler birbiriyle eşleşmiyor.");
      return;
    }

    if (!acceptTerms) {
      setErrorMessage(
        "Devam etmek için kullanım şartlarını kabul etmelisiniz.",
      );
      return;
    }

    const existingHotels = JSON.parse(
      localStorage.getItem("registeredHotels") || "[]",
    );

    const emailExists = existingHotels.some(
      (hotel) =>
        hotel.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (emailExists) {
      setErrorMessage(
        "Bu e-posta adresiyle daha önce kayıt oluşturulmuş.",
      );
      return;
    }

    const newHotel = {
      hotelId: createHotelId(),
      hotelName: hotelName.trim(),
      ownerName: ownerName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city,
      roomCount: Number(roomCount),
      password,
      logo,
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    const updatedHotels = [...existingHotels, newHotel];

    localStorage.setItem(
      "registeredHotels",
      JSON.stringify(updatedHotels),
    );

    localStorage.setItem(
      "hotelUser",
      JSON.stringify({
        hotelId: newHotel.hotelId,
        hotelName: newHotel.hotelName,
        ownerName: newHotel.ownerName,
        email: newHotel.email,
        logo: newHotel.logo,
        role: newHotel.role,
        isLoggedIn: true,
      }),
    );

    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "0.85fr 1.15fr",
        },
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            lg: "flex",
          },
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          p: 6,
          color: "common.white",
          background:
            "linear-gradient(145deg, #172554 0%, #1d4ed8 50%, #7c3aed 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -130,
            right: -100,
            width: 350,
            height: 350,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -180,
            left: -140,
            width: 450,
            height: 450,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.07)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 480,
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              fontSize: 30,
            }}
          >
            <FaBed />
          </Box>

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            Otelinizi dijital olarak yönetmeye başlayın.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 3,
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Otel hesabınızı oluşturun; odaları, personeli,
            temizlik süreçlerini ve raporları tek panelden yönetin.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              mt: 5,
            }}
          >
            {[
              "Kolay oda ve doluluk takibi",
              "Personel ve görev yönetimi",
              "Detaylı rapor ve istatistikler",
            ].map((item, index) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.14)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    borderRadius: 2,
                    backgroundColor: "rgba(255,255,255,0.14)",
                    fontWeight: 800,
                  }}
                >
                  {index + 1}
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: {
            xs: 2,
            sm: 4,
            md: 5,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 760,
            p: {
              xs: 3,
              sm: 5,
            },
            border: 1,
            borderColor: "divider",
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: {
                xs: "flex",
                lg: "none",
              },
              alignItems: "center",
              gap: 1.5,
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2.5,
                color: "common.white",
                backgroundColor: "primary.main",
                fontSize: 20,
              }}
            >
              <FaBed />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
              }}
            >
              Hotel Manager
            </Typography>
          </Box>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
            }}
          >
            Otel Hesabı Oluştur
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              mb: 4,
              color: "text.secondary",
            }}
          >
            Otel yönetim panelinizi kullanmaya başlamak için
            bilgilerinizi girin.
          </Typography>

          {errorMessage && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2.5,
              }}
            >
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                },
                gap: 2.5,
              }}
            >
              <TextField
                label="Otel adı"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaBuilding />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                  },
                }}
              />

              <TextField
                label="Yetkili adı soyadı"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUser />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                  },
                }}
              />

              <TextField
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaEnvelope />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                  },
                }}
              />

              <TextField
                label="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaPhone />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                  },
                }}
              />

              <TextField
                select
                label="Şehir"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaCity />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                  },
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Toplam oda sayısı"
                name="roomCount"
                type="number"
                value={formData.roomCount}
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  htmlInput: {
                    min: 1,
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaBed />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                  },
                }}
              />

              <TextField
                label="Şifre"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaLock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          edge="end"
                          onClick={() =>
                            setShowPassword((currentValue) => !currentValue)
                          }
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                  },
                }}
              />

              <TextField
                label="Şifre tekrar"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaLock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          edge="end"
                          onClick={() =>
                            setShowConfirmPassword(
                              (currentValue) => !currentValue,
                            )
                          }
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2.5,
                border: 1,
                borderStyle: "dashed",
                borderColor: "divider",
                borderRadius: 3,
                backgroundColor: "action.hover",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                }}
              >
                Otel logosu
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 2,
                  color: "text.secondary",
                }}
              >
                PNG veya JPG formatında, en fazla 2 MB.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {logo ? (
                  <Box
                    component="img"
                    src={logo}
                    alt="Otel logosu"
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      objectFit: "cover",
                      border: 1,
                      borderColor: "divider",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                      border: 1,
                      borderColor: "divider",
                      color: "text.secondary",
                      fontSize: 24,
                    }}
                  >
                    <FaImage />
                  </Box>
                )}

                <Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<FaImage />}
                    sx={{
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Logo seç
                    <input
                      hidden
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleLogoChange}
                    />
                  </Button>

                  {logoName && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 1,
                        color: "text.secondary",
                      }}
                    >
                      {logoName}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                />
              }
              label="Kullanım şartlarını ve gizlilik politikasını kabul ediyorum."
              sx={{
                mt: 2,
                alignItems: "flex-start",

                "& .MuiFormControlLabel-label": {
                  mt: 1,
                  fontSize: 14,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              endIcon={<FaUserPlus />}
              sx={{
                mt: 2,
                minHeight: 52,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Otel Hesabı Oluştur
            </Button>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 3,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Zaten bir hesabınız var mı?{" "}
            <Box
              component={Link}
              to="/login"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Giriş yapın
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Register;