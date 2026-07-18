import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
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
  FaChartColumn,
  FaCoins,
  FaUserGroup,
} from "react-icons/fa6";

const summaryCards = [
  {
    id: 1,
    title: "Aylık Gelir",
    value: "842.500 TL",
    description: "Geçen aya göre %12 artış",
    icon: <FaCoins />,
    iconColor: "#16a34a",
    iconBackground: "#dcfce7",
  },
  {
    id: 2,
    title: "Doluluk Oranı",
    value: "%78",
    description: "Toplam 120 odanın 94'ü dolu",
    icon: <FaBed />,
    iconColor: "#2563eb",
    iconBackground: "#dbeafe",
  },
  {
    id: 3,
    title: "Toplam Misafir",
    value: "186",
    description: "Bu ay konaklayan misafir sayısı",
    icon: <FaUserGroup />,
    iconColor: "#9333ea",
    iconBackground: "#f3e8ff",
  },
  {
    id: 4,
    title: "Temizlik Oranı",
    value: "%92",
    description: "Tamamlanan temizlik görevleri",
    icon: <FaBroom />,
    iconColor: "#ea580c",
    iconBackground: "#ffedd5",
  },
];

const monthlyPerformance = [
  {
    month: "Ocak",
    occupancy: 62,
    revenue: 590000,
    guests: 124,
  },
  {
    month: "Şubat",
    occupancy: 68,
    revenue: 640000,
    guests: 138,
  },
  {
    month: "Mart",
    occupancy: 71,
    revenue: 695000,
    guests: 149,
  },
  {
    month: "Nisan",
    occupancy: 74,
    revenue: 735000,
    guests: 157,
  },
  {
    month: "Mayıs",
    occupancy: 78,
    revenue: 842500,
    guests: 186,
  },
];

const roomTypePerformance = [
  {
    type: "Standart Oda",
    totalRooms: 60,
    occupiedRooms: 46,
    occupancyRate: 77,
    revenue: 325000,
  },
  {
    type: "Deluxe Oda",
    totalRooms: 36,
    occupiedRooms: 29,
    occupancyRate: 81,
    revenue: 287500,
  },
  {
    type: "Suit Oda",
    totalRooms: 18,
    occupiedRooms: 14,
    occupancyRate: 78,
    revenue: 180000,
  },
  {
    type: "Aile Odası",
    totalRooms: 6,
    occupiedRooms: 5,
    occupancyRate: 83,
    revenue: 50000,
  },
];

const departmentPerformance = [
  {
    department: "Resepsiyon",
    completed: 96,
    pending: 4,
    status: "Çok İyi",
  },
  {
    department: "Kat Hizmetleri",
    completed: 92,
    pending: 8,
    status: "İyi",
  },
  {
    department: "Teknik Servis",
    completed: 84,
    pending: 16,
    status: "Orta",
  },
  {
    department: "Yönetim",
    completed: 98,
    pending: 2,
    status: "Çok İyi",
  },
];

function getStatusColor(status) {
  switch (status) {
    case "Çok İyi":
      return "success";

    case "İyi":
      return "primary";

    case "Orta":
      return "warning";

    default:
      return "default";
  }
}

function Reports() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
          }}
        >
          Raporlar
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 0.75,
            color: "text.secondary",
          }}
        >
          Otelin gelir, doluluk ve departman performansını inceleyin.
        </Typography>
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
                  variant="h5"
                  sx={{
                    mt: 0.5,
                    fontWeight: 700,
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
                  }}
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
            xl: "1.4fr 1fr",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2.5,
                color: "primary.main",
                backgroundColor: "primary.light",
              }}
            >
              <FaChartColumn />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Aylık Doluluk Performansı
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                }}
              >
                Son beş aya ait doluluk oranları
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {monthlyPerformance.map((item) => (
              <Box key={item.month}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {item.month}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    %{item.occupancy}
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={item.occupancy}
                  sx={{
                    height: 9,
                    borderRadius: 999,

                    "& .MuiLinearProgress-bar": {
                      borderRadius: 999,
                    },
                  }}
                />
              </Box>
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Aylık Gelir Özeti
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 3,
            }}
          >
            Son beş aya ait gelir bilgileri
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {monthlyPerformance.map((item) => (
              <Box
                key={item.month}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  pb: 2,
                  borderBottom: 1,
                  borderColor: "divider",

                  "&:last-child": {
                    pb: 0,
                    borderBottom: 0,
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {item.month}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {item.guests} misafir
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "success.main",
                  }}
                >
                  {item.revenue.toLocaleString("tr-TR")} TL
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          mb: 3,
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Oda Tipi Performansı
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              color: "text.secondary",
            }}
          >
            Oda türlerine göre doluluk ve gelir durumu
          </Typography>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 760 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "action.hover",
                }}
              >
                <TableCell sx={{ fontWeight: 700 }}>
                  Oda Tipi
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Toplam Oda
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Dolu Oda
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Doluluk
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Gelir
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {roomTypePerformance.map((room) => (
                <TableRow
                  key={room.type}
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
                      {room.type}
                    </Typography>
                  </TableCell>

                  <TableCell>{room.totalRooms}</TableCell>

                  <TableCell>{room.occupiedRooms}</TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: 170,
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={room.occupancyRate}
                        sx={{
                          width: 100,
                          height: 8,
                          borderRadius: 999,

                          "& .MuiLinearProgress-bar": {
                            borderRadius: 999,
                          },
                        }}
                      />

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        %{room.occupancyRate}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: "success.main",
                      }}
                    >
                      {room.revenue.toLocaleString("tr-TR")} TL
                    </Typography>
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
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Departman Performansı
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              color: "text.secondary",
            }}
          >
            Tamamlanan ve bekleyen işlemlerin dağılımı
          </Typography>
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
                  Departman
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Tamamlanma
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Bekleyen
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Durum
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {departmentPerformance.map((department) => (
                <TableRow
                  key={department.department}
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
                      {department.department}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    %{department.completed}
                  </TableCell>

                  <TableCell>
                    %{department.pending}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={department.status}
                      color={getStatusColor(department.status)}
                      size="small"
                      sx={{
                        fontWeight: 600,
                      }}
                    />
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

export default Reports;