import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  FaBed,
  FaBroom,
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

const recentRooms = [
  {
    roomNumber: "101",
    guest: "Ahmet Yılmaz",
    status: "Dolu",
    time: "10 dakika önce",
  },
  {
    roomNumber: "204",
    guest: "Elif Demir",
    status: "Çıkış Yapıldı",
    time: "25 dakika önce",
  },
  {
    roomNumber: "305",
    guest: "Mehmet Kaya",
    status: "Temizlikte",
    time: "40 dakika önce",
  },
  {
    roomNumber: "410",
    guest: "Zeynep Çelik",
    status: "Rezerve",
    time: "1 saat önce",
  },
];

function getStatusColor(status) {
  switch (status) {
    case "Dolu":
      return "success";

    case "Çıkış Yapıldı":
      return "error";

    case "Temizlikte":
      return "warning";

    case "Rezerve":
      return "primary";

    default:
      return "default";
  }
}

function Dashboard() {
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
            Genel Bakış
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.75,
              color: "text.secondary",
            }}
          >
            Otelin güncel durumunu buradan takip edebilirsiniz.
          </Typography>
        </Box>

        <Chip
          label="Bugünkü Durum"
          variant="outlined"
          sx={{
            height: 38,
            px: 0.5,
            borderRadius: 2.5,
            backgroundColor: "background.paper",
            fontWeight: 600,
          }}
        />
      </Box>

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
              transition: "transform 0.2s ease, box-shadow 0.2s ease",

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
                  backgroundColor: card.iconBackground,
                  fontSize: 21,
                }}
              >
                {card.icon}
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                  }}
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    mt: 0.5,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {card.value}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 0.75,
                    color: "text.disabled",
                    lineHeight: 1.5,
                  }}
                >
                  {card.description}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
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
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
              }}
            >
              Son Oda Hareketleri
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                color: "text.secondary",
              }}
            >
              Odalarda gerçekleşen son işlemler.
            </Typography>
          </Box>

          <Button
            type="button"
            variant="text"
            sx={{
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Tümünü Gör
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "action.hover",
                }}
              >
                <TableCell sx={{ fontWeight: 700 }}>
                  Oda Numarası
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Misafir
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
                  key={room.roomNumber}
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
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Oda {room.roomNumber}
                    </Typography>
                  </TableCell>

                  <TableCell>{room.guest}</TableCell>

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
    </Box>
  );
}

export default Dashboard;