import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  FaBed,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaRightToBracket,
} from "react-icons/fa6";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setErrorMessage("Lütfen e-posta ve şifre alanlarını doldurun.");
      return;
    }

    let registeredHotels = [];

    try {
      registeredHotels = JSON.parse(
        localStorage.getItem("registeredHotels") || "[]",
      );
    } catch {
      setErrorMessage(
        "Kayıtlı hesap bilgileri okunamadı. Lütfen tekrar kayıt olun.",
      );
      return;
    }

    if (
      !Array.isArray(registeredHotels) ||
      registeredHotels.length === 0
    ) {
      setErrorMessage(
        "Henüz kayıtlı bir otel hesabı bulunmuyor. Önce kayıt oluşturun.",
      );
      return;
    }

    const registeredHotel = registeredHotels.find(
      (hotel) =>
        hotel.email?.toLowerCase() === email &&
        hotel.password === password,
    );

    if (!registeredHotel) {
      setErrorMessage("E-posta veya şifre hatalı.");
      return;
    }

    login(registeredHotel, formData.rememberMe);

    navigate("/dashboard", { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
        },
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          p: 6,
          color: "common.white",
          background:
            "linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #7c3aed 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -150,
            left: -120,
            width: 380,
            height: 380,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 520,
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
              backgroundColor: "rgba(255,255,255,0.16)",
              backdropFilter: "blur(10px)",
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
            Otel yönetimini tek panelden kontrol edin.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 3,
              maxWidth: 460,
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Odalarınızı, personellerinizi, temizlik görevlerini ve
            raporlarınızı kolayca yönetin.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              mt: 6,
            }}
          >
            {[
              {
                value: "7/24",
                label: "Erişim",
              },
              {
                value: "%100",
                label: "Kontrol",
              },
              {
                value: "Tek",
                label: "Yönetim Paneli",
              },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  p: 2,
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {item.label}
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
            md: 6,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 480,
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
                md: "none",
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

            <Typography variant="h6" sx={{ fontWeight: 800 }}>
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
            Hoş Geldiniz
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              mb: 4,
              color: "text.secondary",
            }}
          >
            Yönetim paneline erişmek için otel hesabınıza giriş yapın.
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
            <TextField
              label="E-posta"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ornek@otel.com"
              autoComplete="email"
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
                mb: 2.5,

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
              placeholder="Şifrenizi girin"
              autoComplete="current-password"
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
                        aria-label={
                          showPassword
                            ? "Şifreyi gizle"
                            : "Şifreyi göster"
                        }
                        onClick={() =>
                          setShowPassword(
                            (currentValue) => !currentValue,
                          )
                        }
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 1,

                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                }
                label="Beni hatırla"
                sx={{
                  m: 0,

                  "& .MuiFormControlLabel-label": {
                    fontSize: 14,
                  },
                }}
              />

              <Button
                type="button"
                variant="text"
                sx={{
                  p: 0,
                  minWidth: "auto",
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Şifremi unuttum
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              endIcon={<FaRightToBracket />}
              sx={{
                minHeight: 50,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Giriş Yap
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
            Henüz bir otel hesabınız yok mu?{" "}
            <Box
              component={Link}
              to="/register"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Kayıt olun
            </Box>
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 4,
              textAlign: "center",
              color: "text.disabled",
            }}
          >
            © 2026 Hotel Manager. Tüm hakları saklıdır.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;