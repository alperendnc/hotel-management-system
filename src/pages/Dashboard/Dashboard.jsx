import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaBed,
  FaBroom,
  FaCalendarCheck,
  FaCalendarXmark,
  FaCircleExclamation,
  FaCreditCard,
  FaDoorOpen,
  FaUserCheck,
} from "react-icons/fa6";

const summaryCards = [
  {
    id: 1,
    title: "Toplam Oda",
    value: 120,
    description: "Otelde bulunan toplam oda",
    icon: <FaBed />,
    iconColor: "#2563eb",
    iconBackground: "#dbeafe",
  },
  {
    id: 2,
    title: "Dolu Oda",
    value: 78,
    description: "Şu anda kullanılan odalar",
    icon: <FaUserCheck />,
    iconColor: "#16a34a",
    iconBackground: "#dcfce7",
  },
  {
    id: 3,
    title: "Boş Oda",
    value: 34,
    description: "Konaklamaya hazır odalar",
    icon: <FaDoorOpen />,
    iconColor: "#9333ea",
    iconBackground: "#f3e8ff",
  },
  {
    id: 4,
    title: "Temizlik Bekleyen",
    value: 8,
    description: "Temizlenmesi gereken odalar",
    icon: <FaBroom />,
    iconColor: "#ea580c",
    iconBackground: "#ffedd5",
  },
];

const todayOperations = [
  {
    id: 1,
    title: "Bugünkü Girişler",
    value: 12,
    description: "4 misafir henüz giriş yapmadı",
    icon: <FaCalendarCheck />,
    color: "success.main",
    backgroundColor: "success.lighter",
    path: "/guests",
  },
  {
    id: 2,
    title: "Bugünkü Çıkışlar",
    value: 9,
    description: "3 oda çıkış işlemi bekliyor",
    icon: <FaCalendarXmark />,
    color: "error.main",
    backgroundColor: "error.lighter",
    path: "/guests",
  },
  {
    id: 3,
    title: "Bekleyen Ödemeler",
    value: 6,
    description: "Toplam 24.500 TL ödeme bekliyor",
    icon: <FaCreditCard />,
    color: "warning.main",
    backgroundColor: "warning.lighter",
    path: "/guests",
  },
];

const housekeepingSummary = [
  {
    id: 1,
    label: "Temiz Odalar",
    value: 96,
    total: 120,
    color: "success",
  },
  {
    id: 2,
    label: "Temizlik Bekleyen",
    value: 8,
    total: 120,
    color: "warning",
  },
  {
    id: 3,
    label: "Temizleniyor",
    value: 11,
    total: 120,
    color: "primary",
  },
  {
    id: 4,
    label: "Bakımda",
    value: 5,
    total: 120,
    color: "error",
  },
];

const recentRooms = [
  {
    id: 1,
    roomNumber: "101",
    guest: "Ahmet Yılmaz",
    status: "Dolu",
    operation: "Giriş yapıldı",
    time: "10 dakika önce",
  },
  {
    id: 2,
    roomNumber: "204",
    guest: "Elif Demir",
    status: "Çıkış Yapıldı",
    operation: "Çıkış işlemi tamamlandı",
    time: "25 dakika önce",
  },
  {
    id: 3,
    roomNumber: "305",
    guest: "Mehmet Kaya",
    status: "Temizlikte",
    operation: "Temizlik görevi oluşturuldu",
    time: "40 dakika önce",
  },
  {
    id: 4,
    roomNumber: "410",
    guest: "Zeynep Çelik",
    status: "Rezerve",
    operation: "Yeni rezervasyon oluşturuldu",
    time: "1 saat önce",
  },
  {
    id: 5,
    roomNumber: "206",
    guest: "Michael Brown",
    status: "Dolu",
    operation: "Oda değişikliği yapıldı",
    time: "2 saat önce",
  },
];

function getStatusColor(status) {
  const statusColors = {
    Dolu: "success",
    "Çıkış Yapıldı": "error",
    Temizlikte: "warning",
    Rezerve: "primary",
  };

  return statusColors[status] || "default";
}

function Dashboard() {
  const navigate = useNavigate();

  const totalRooms = 120;
  const occupiedRooms = 78;

  const occupancyRate = Math.round(
    (occupiedRooms / totalRooms) * 100,
  );

  const currentDate = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={800}
          >
            Genel Bakış
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.75}
          >
            Otelin güncel durumunu ve günlük işlemleri buradan
            takip edebilirsiniz.
          </Typography>
        </Box>

        <Chip
          label={currentDate}
          variant="outlined"
          sx={{
            height: 38,
            px: 0.75,
            borderRadius: 2.5,
            bgcolor: "background.paper",
            fontWeight: 600,
          }}
        />
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        {summaryCards.map((card) => (
          <Card
            key={card.id}
            elevation={0}
            sx={{
              height: "100%",
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease",

              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                p: 2.5,

                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  borderRadius: 3,
                  color: card.iconColor,
                  bgcolor: card.iconBackground,
                  fontSize: 21,
                }}
              >
                {card.icon}
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={800}
                  lineHeight={1.2}
                  mt={0.5}
                >
                  {card.value}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.disabled"
                  lineHeight={1.5}
                  display="block"
                  mt={0.75}
                >
                  {card.description}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            xl: "minmax(0, 1.7fr) minmax(320px, 1fr)",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            spacing={2}
            mb={3}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={800}
              >
                Günlük İşlemler
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.5}
              >
                Bugün gerçekleştirilmesi gereken otel işlemleri.
              </Typography>
            </Box>

            <Chip
              label="Canlı takip"
              color="success"
              size="small"
              variant="outlined"
            />
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {todayOperations.map((operation) => (
              <Paper
                key={operation.id}
                variant="outlined"
                sx={{
                  p: 2.25,
                  borderRadius: 3,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {operation.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={800}
                      mt={0.5}
                    >
                      {operation.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 43,
                      height: 43,
                      borderRadius: 2.5,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "action.hover",
                      color: operation.color,
                      fontSize: 18,
                    }}
                  >
                    {operation.icon}
                  </Box>
                </Stack>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  minHeight={38}
                  mt={1.5}
                >
                  {operation.description}
                </Typography>

                <Button
                  type="button"
                  size="small"
                  endIcon={<FaArrowRight />}
                  onClick={() => navigate(operation.path)}
                  sx={{
                    mt: 1,
                    px: 0,
                    fontWeight: 700,
                  }}
                >
                  Detayları Gör
                </Button>
              </Paper>
            ))}
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={800}
              >
                Oda Doluluk Oranı
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.5}
              >
                Otelin mevcut doluluk durumu.
              </Typography>
            </Box>

            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 2.5,
                display: "grid",
                placeItems: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontSize: 19,
              }}
            >
              <FaBed />
            </Box>
          </Stack>

          <Box
            sx={{
              py: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              fontWeight={800}
              color="primary.main"
            >
              %{occupancyRate}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              {occupiedRooms} / {totalRooms} oda dolu
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={occupancyRate}
            sx={{
              height: 10,
              borderRadius: 10,
              bgcolor: "action.hover",

              "& .MuiLinearProgress-bar": {
                borderRadius: 10,
              },
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            mt={1.5}
          >
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Dolu: {occupiedRooms}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Kullanılabilir: {totalRooms - occupiedRooms}
            </Typography>
          </Stack>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            endIcon={<FaArrowRight />}
            onClick={() => navigate("/rooms")}
            sx={{
              mt: 3,
              py: 1,
              borderRadius: 2.5,
              fontWeight: 700,
            }}
          >
            Odaları Görüntüle
          </Button>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 1.5fr) minmax(300px, 0.7fr)",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            justifyContent="space-between"
            spacing={2}
            p={3}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={800}
              >
                Son Oda Hareketleri
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.5}
              >
                Odalarda gerçekleşen son işlemler.
              </Typography>
            </Box>

            <Button
              type="button"
              variant="text"
              endIcon={<FaArrowRight />}
              onClick={() => navigate("/rooms")}
              sx={{
                fontWeight: 700,
              }}
            >
              Tümünü Gör
            </Button>
          </Stack>

          <Divider />

          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "action.hover",
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>
                    Oda
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Misafir
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    İşlem
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Durum
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>
                    Zaman
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recentRooms.map((room) => (
                  <TableRow
                    key={room.id}
                    hover
                    sx={{
                      "&:last-child td": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight={800}
                      >
                        Oda {room.roomNumber}
                      </Typography>
                    </TableCell>

                    <TableCell>{room.guest}</TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {room.operation}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={room.status}
                        color={getStatusColor(room.status)}
                        size="small"
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {room.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={2}
            mb={3}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={800}
              >
                Housekeeping
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.5}
              >
                Güncel oda temizlik durumu.
              </Typography>
            </Box>

            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                display: "grid",
                placeItems: "center",
                bgcolor: "warning.main",
                color: "warning.contrastText",
                fontSize: 18,
              }}
            >
              <FaBroom />
            </Box>
          </Stack>

          <Stack spacing={2.5}>
            {housekeepingSummary.map((item) => {
              const percentage = Math.round(
                (item.value / item.total) * 100,
              );

              return (
                <Box key={item.id}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={0.75}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.value}
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    color={item.color}
                    sx={{
                      height: 7,
                      borderRadius: 10,
                      bgcolor: "action.hover",

                      "& .MuiLinearProgress-bar": {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Stack>

          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              p: 2,
              mt: 3,
              borderRadius: 2.5,
              bgcolor: "action.hover",
            }}
          >
            <Box
              sx={{
                color: "warning.main",
                mt: 0.25,
              }}
            >
              <FaCircleExclamation />
            </Box>

            <Box>
              <Typography
                variant="body2"
                fontWeight={700}
              >
                8 oda temizlik bekliyor
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Görev dağılımı yapılması gereken odalar bulunuyor.
              </Typography>
            </Box>
          </Paper>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            endIcon={<FaArrowRight />}
            onClick={() => navigate("/housekeeping")}
            sx={{
              mt: 3,
              py: 1,
              borderRadius: 2.5,
              fontWeight: 700,
            }}
          >
            Housekeeping Sayfasına Git
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;