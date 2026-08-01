import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  FaBed,
  FaCalendarCheck,
  FaCalendarDays,
  FaCreditCard,
  FaEye,
  FaMagnifyingGlass,
  FaPen,
  FaPlus,
  FaTrash,
  FaUser,
  FaXmark,
} from "react-icons/fa6";

const initialReservations = [
  {
    id: 1,
    reservationNumber: "RSV-1001",
    guestName: "Ahmet Yılmaz",
    guestPhone: "0555 111 22 33",
    roomNumber: "101",
    roomType: "Standart Oda",
    checkInDate: "2026-08-03",
    checkOutDate: "2026-08-06",
    nightlyPrice: 2500,
    totalPrice: 7500,
    reservationStatus: "confirmed",
    paymentStatus: "paid",
    notes: "Sessiz oda tercih ediyor.",
  },
  {
    id: 2,
    reservationNumber: "RSV-1002",
    guestName: "Elif Demir",
    guestPhone: "0555 444 55 66",
    roomNumber: "204",
    roomType: "Deluxe Oda",
    checkInDate: "2026-08-05",
    checkOutDate: "2026-08-09",
    nightlyPrice: 3750,
    totalPrice: 15000,
    reservationStatus: "pending",
    paymentStatus: "partial",
    notes: "Geç giriş yapacak.",
  },
  {
    id: 3,
    reservationNumber: "RSV-1003",
    guestName: "Michael Brown",
    guestPhone: "+44 7700 900123",
    roomNumber: "301",
    roomType: "Suit Oda",
    checkInDate: "2026-08-08",
    checkOutDate: "2026-08-12",
    nightlyPrice: 5200,
    totalPrice: 20800,
    reservationStatus: "cancelled",
    paymentStatus: "unpaid",
    notes: "Havalimanı transferi istemişti.",
  },
];

const roomOptions = [
  {
    roomNumber: "101",
    roomType: "Standart Oda",
    nightlyPrice: 2500,
  },
  {
    roomNumber: "102",
    roomType: "Standart Oda",
    nightlyPrice: 2500,
  },
  {
    roomNumber: "201",
    roomType: "Deluxe Oda",
    nightlyPrice: 3750,
  },
  {
    roomNumber: "204",
    roomType: "Deluxe Oda",
    nightlyPrice: 3750,
  },
  {
    roomNumber: "301",
    roomType: "Suit Oda",
    nightlyPrice: 5200,
  },
];

const emptyReservationForm = {
  guestName: "",
  guestPhone: "",
  roomNumber: "",
  roomType: "",
  checkInDate: "",
  checkOutDate: "",
  nightlyPrice: "",
  totalPrice: 0,
  reservationStatus: "pending",
  paymentStatus: "unpaid",
  notes: "",
};

const reservationStatusOptions = [
  {
    value: "pending",
    label: "Bekliyor",
  },
  {
    value: "confirmed",
    label: "Onaylandı",
  },
  {
    value: "checked-in",
    label: "Giriş Yapıldı",
  },
  {
    value: "completed",
    label: "Tamamlandı",
  },
  {
    value: "cancelled",
    label: "İptal Edildi",
  },
];

const paymentStatusOptions = [
  {
    value: "paid",
    label: "Ödendi",
  },
  {
    value: "partial",
    label: "Kısmi Ödendi",
  },
  {
    value: "unpaid",
    label: "Ödenmedi",
  },
];

function getReservationStatus(status) {
  const statuses = {
    pending: {
      label: "Bekliyor",
      color: "warning",
    },
    confirmed: {
      label: "Onaylandı",
      color: "success",
    },
    "checked-in": {
      label: "Giriş Yapıldı",
      color: "primary",
    },
    completed: {
      label: "Tamamlandı",
      color: "default",
    },
    cancelled: {
      label: "İptal Edildi",
      color: "error",
    },
  };

  return (
    statuses[status] || {
      label: "Bilinmiyor",
      color: "default",
    }
  );
}

function getPaymentStatus(status) {
  const statuses = {
    paid: {
      label: "Ödendi",
      color: "success",
    },
    partial: {
      label: "Kısmi Ödendi",
      color: "warning",
    },
    unpaid: {
      label: "Ödenmedi",
      color: "error",
    },
  };

  return (
    statuses[status] || {
      label: "Bilinmiyor",
      color: "default",
    }
  );
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("tr-TR").format(
    new Date(`${date}T00:00:00`),
  );
}

function formatPrice(price) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);
}

function calculateNightCount(checkInDate, checkOutDate) {
  if (!checkInDate || !checkOutDate) {
    return 0;
  }

  const checkIn = new Date(`${checkInDate}T00:00:00`);
  const checkOut = new Date(`${checkOutDate}T00:00:00`);

  const difference = checkOut.getTime() - checkIn.getTime();

  if (difference <= 0) {
    return 0;
  }

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function Reservations() {
  const [reservations, setReservations] = useState(
    initialReservations,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState(
    emptyReservationForm,
  );

  const [formErrors, setFormErrors] = useState({});

  const [reservationDialogOpen, setReservationDialogOpen] =
    useState(false);

  const [detailsDialogOpen, setDetailsDialogOpen] =
    useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [editingReservationId, setEditingReservationId] =
    useState(null);

  const [selectedReservation, setSelectedReservation] =
    useState(null);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const filteredReservations = useMemo(() => {
    const searchValue = searchTerm
      .trim()
      .toLocaleLowerCase("tr-TR");

    return reservations.filter((reservation) => {
      const searchableValues = [
        reservation.reservationNumber,
        reservation.guestName,
        reservation.guestPhone,
        reservation.roomNumber,
      ];

      const matchesSearch = searchableValues.some((value) =>
        value
          ?.toString()
          .toLocaleLowerCase("tr-TR")
          .includes(searchValue),
      );

      const matchesStatus =
        statusFilter === "all" ||
        reservation.reservationStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchTerm, statusFilter]);

  const statistics = useMemo(() => {
    return {
      total: reservations.length,

      confirmed: reservations.filter(
        (reservation) =>
          reservation.reservationStatus === "confirmed",
      ).length,

      pending: reservations.filter(
        (reservation) =>
          reservation.reservationStatus === "pending",
      ).length,

      unpaid: reservations.filter(
        (reservation) =>
          reservation.paymentStatus === "unpaid" ||
          reservation.paymentStatus === "partial",
      ).length,
    };
  }, [reservations]);

  const showNotification = (
    message,
    severity = "success",
  ) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleOpenAddDialog = () => {
    setEditingReservationId(null);
    setFormData(emptyReservationForm);
    setFormErrors({});
    setReservationDialogOpen(true);
  };

  const handleOpenEditDialog = (reservation) => {
    setEditingReservationId(reservation.id);

    setFormData({
      guestName: reservation.guestName,
      guestPhone: reservation.guestPhone,
      roomNumber: reservation.roomNumber,
      roomType: reservation.roomType,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      nightlyPrice: reservation.nightlyPrice,
      totalPrice: reservation.totalPrice,
      reservationStatus: reservation.reservationStatus,
      paymentStatus: reservation.paymentStatus,
      notes: reservation.notes,
    });

    setFormErrors({});
    setReservationDialogOpen(true);
  };

  const handleOpenDetailsDialog = (reservation) => {
    setSelectedReservation(reservation);
    setDetailsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (reservation) => {
    setSelectedReservation(reservation);
    setDeleteDialogOpen(true);
  };

  const handleCloseReservationDialog = () => {
    setReservationDialogOpen(false);
    setEditingReservationId(null);
    setFormData(emptyReservationForm);
    setFormErrors({});
  };

  const updateTotalPrice = (updatedForm) => {
    const nightCount = calculateNightCount(
      updatedForm.checkInDate,
      updatedForm.checkOutDate,
    );

    return {
      ...updatedForm,
      totalPrice:
        nightCount * (Number(updatedForm.nightlyPrice) || 0),
    };
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => {
      let updatedForm = {
        ...currentFormData,
        [name]: value,
      };

      if (name === "roomNumber") {
        const selectedRoom = roomOptions.find(
          (room) => room.roomNumber === value,
        );

        if (selectedRoom) {
          updatedForm = {
            ...updatedForm,
            roomType: selectedRoom.roomType,
            nightlyPrice: selectedRoom.nightlyPrice,
          };
        }
      }

      if (
        name === "roomNumber" ||
        name === "checkInDate" ||
        name === "checkOutDate" ||
        name === "nightlyPrice"
      ) {
        updatedForm = updateTotalPrice(updatedForm);
      }

      return updatedForm;
    });

    if (formErrors[name]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.guestName.trim()) {
      errors.guestName = "Misafir adı zorunludur.";
    }

    if (!formData.guestPhone.trim()) {
      errors.guestPhone = "Telefon numarası zorunludur.";
    }

    if (!formData.roomNumber) {
      errors.roomNumber = "Oda seçimi zorunludur.";
    }

    if (!formData.checkInDate) {
      errors.checkInDate = "Giriş tarihi zorunludur.";
    }

    if (!formData.checkOutDate) {
      errors.checkOutDate = "Çıkış tarihi zorunludur.";
    }

    if (
      formData.checkInDate &&
      formData.checkOutDate &&
      formData.checkOutDate <= formData.checkInDate
    ) {
      errors.checkOutDate =
        "Çıkış tarihi giriş tarihinden sonra olmalıdır.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const createReservationNumber = () => {
    const nextNumber = reservations.length + 1001;

    return `RSV-${nextNumber}`;
  };

  const handleSaveReservation = () => {
    if (!validateForm()) {
      showNotification(
        "Lütfen form alanlarını kontrol edin.",
        "error",
      );

      return;
    }

    const normalizedReservation = {
      ...formData,
      nightlyPrice: Number(formData.nightlyPrice) || 0,
      totalPrice: Number(formData.totalPrice) || 0,
    };

    if (editingReservationId) {
      setReservations((currentReservations) =>
        currentReservations.map((reservation) =>
          reservation.id === editingReservationId
            ? {
                ...reservation,
                ...normalizedReservation,
              }
            : reservation,
        ),
      );

      showNotification(
        "Rezervasyon başarıyla güncellendi.",
      );
    } else {
      const newReservation = {
        id: crypto.randomUUID(),
        reservationNumber: createReservationNumber(),
        ...normalizedReservation,
      };

      setReservations((currentReservations) => [
        newReservation,
        ...currentReservations,
      ]);

      showNotification(
        "Yeni rezervasyon başarıyla oluşturuldu.",
      );
    }

    handleCloseReservationDialog();
  };

  const handleDeleteReservation = () => {
    if (!selectedReservation) {
      return;
    }

    setReservations((currentReservations) =>
      currentReservations.filter(
        (reservation) =>
          reservation.id !== selectedReservation.id,
      ),
    );

    setDeleteDialogOpen(false);
    setSelectedReservation(null);

    showNotification(
      "Rezervasyon kaydı silindi.",
      "info",
    );
  };

  const statisticCards = [
    {
      title: "Toplam Rezervasyon",
      value: statistics.total,
      description: "Kayıtlı rezervasyon",
      icon: <FaCalendarDays />,
      color: "primary.main",
    },
    {
      title: "Onaylanan",
      value: statistics.confirmed,
      description: "Onaylanmış rezervasyon",
      icon: <FaCalendarCheck />,
      color: "success.main",
    },
    {
      title: "Bekleyen",
      value: statistics.pending,
      description: "Onay bekleyen rezervasyon",
      icon: <FaUser />,
      color: "warning.main",
    },
    {
      title: "Bekleyen Ödeme",
      value: statistics.unpaid,
      description: "Eksik veya ödenmemiş",
      icon: <FaCreditCard />,
      color: "error.main",
    },
  ];

  return (
    <Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        alignItems={{
          xs: "stretch",
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
            Rezervasyonlar
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Rezervasyonları, oda atamalarını ve ödeme
            durumlarını yönetin.
          </Typography>
        </Box>

        <Button
          type="button"
          variant="contained"
          startIcon={<FaPlus />}
          onClick={handleOpenAddDialog}
          sx={{
            px: 2.5,
            py: 1.25,
            borderRadius: 2.5,
            whiteSpace: "nowrap",
          }}
        >
          Yeni Rezervasyon
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {statisticCards.map((card) => (
          <Card
            key={card.title}
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    mt={0.5}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {card.description}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    borderRadius: 3,
                    bgcolor: card.color,
                    color: "#ffffff",
                    fontSize: 20,
                  }}
                >
                  {card.icon}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Rezervasyon no, misafir, telefon veya oda ara..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaMagnifyingGlass />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl
            sx={{
              minWidth: {
                xs: "100%",
                md: 230,
              },
            }}
          >
            <InputLabel id="reservation-status-filter">
              Rezervasyon Durumu
            </InputLabel>

            <Select
              labelId="reservation-status-filter"
              value={statusFilter}
              label="Rezervasyon Durumu"
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <MenuItem value="all">
                Tüm Rezervasyonlar
              </MenuItem>

              {reservationStatusOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {filteredReservations.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            py: 8,
            px: 3,
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <FaCalendarDays size={34} />

          <Typography
            variant="h6"
            fontWeight={800}
            mt={2}
          >
            Rezervasyon bulunamadı
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Arama veya filtreleme seçeneklerini değiştirin.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {filteredReservations.map((reservation) => {
            const reservationStatus =
              getReservationStatus(
                reservation.reservationStatus,
              );

            const paymentStatus = getPaymentStatus(
              reservation.paymentStatus,
            );

            return (
              <Paper
                key={reservation.id}
                elevation={0}
                sx={{
                  p: {
                    xs: 2,
                    md: 2.5,
                  },
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 3,
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",

                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    xl: "row",
                  }}
                  alignItems={{
                    xs: "stretch",
                    xl: "center",
                  }}
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Box sx={{ minWidth: 190 }}>
                    <Typography
                      variant="caption"
                      color="primary.main"
                      fontWeight={800}
                    >
                      {reservation.reservationNumber}
                    </Typography>

                    <Typography
                      variant="h6"
                      fontWeight={800}
                      mt={0.5}
                    >
                      {reservation.guestName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {reservation.guestPhone}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(2, minmax(0, 1fr))",
                        md: "repeat(5, minmax(120px, 1fr))",
                      },
                      gap: 2,
                      flexGrow: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Oda
                      </Typography>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.75}
                        mt={0.5}
                      >
                        <FaBed size={14} />

                        <Typography fontWeight={700}>
                          {reservation.roomNumber}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {reservation.roomType}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Giriş
                      </Typography>

                      <Typography fontWeight={700}>
                        {formatDate(
                          reservation.checkInDate,
                        )}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Çıkış
                      </Typography>

                      <Typography fontWeight={700}>
                        {formatDate(
                          reservation.checkOutDate,
                        )}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Rezervasyon
                      </Typography>

                      <Box mt={0.5}>
                        <Chip
                          label={reservationStatus.label}
                          color={reservationStatus.color}
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Toplam Tutar
                      </Typography>

                      <Typography
                        fontWeight={800}
                        color="primary.main"
                      >
                        {formatPrice(
                          reservation.totalPrice,
                        )}
                      </Typography>

                      <Chip
                        label={paymentStatus.label}
                        color={paymentStatus.color}
                        variant="outlined"
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>

                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={0.5}
                  >
                    <Tooltip title="Detayları Gör">
                      <IconButton
                        type="button"
                        onClick={() =>
                          handleOpenDetailsDialog(
                            reservation,
                          )
                        }
                      >
                        <FaEye size={17} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Düzenle">
                      <IconButton
                        type="button"
                        color="primary"
                        onClick={() =>
                          handleOpenEditDialog(
                            reservation,
                          )
                        }
                      >
                        <FaPen size={16} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Sil">
                      <IconButton
                        type="button"
                        color="error"
                        onClick={() =>
                          handleOpenDeleteDialog(
                            reservation,
                          )
                        }
                      >
                        <FaTrash size={16} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}

      <Dialog
        open={reservationDialogOpen}
        onClose={handleCloseReservationDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={800}
              >
                {editingReservationId
                  ? "Rezervasyonu Düzenle"
                  : "Yeni Rezervasyon Oluştur"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Misafir, oda ve tarih bilgilerini girin.
              </Typography>
            </Box>

            <IconButton
              type="button"
              onClick={handleCloseReservationDialog}
            >
              <FaXmark />
            </IconButton>
          </Stack>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <Typography
            variant="subtitle2"
            fontWeight={800}
            mb={2}
          >
            Misafir Bilgileri
          </Typography>

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
              label="Misafir Adı Soyadı"
              name="guestName"
              value={formData.guestName}
              onChange={handleFormChange}
              error={Boolean(formErrors.guestName)}
              helperText={formErrors.guestName}
              fullWidth
              required
            />

            <TextField
              label="Telefon"
              name="guestPhone"
              value={formData.guestPhone}
              onChange={handleFormChange}
              error={Boolean(formErrors.guestPhone)}
              helperText={formErrors.guestPhone}
              fullWidth
              required
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="subtitle2"
            fontWeight={800}
            mb={2}
          >
            Oda ve Tarih Bilgileri
          </Typography>

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
            <FormControl
              fullWidth
              error={Boolean(formErrors.roomNumber)}
            >
              <InputLabel id="reservation-room-label">
                Oda
              </InputLabel>

              <Select
                labelId="reservation-room-label"
                name="roomNumber"
                value={formData.roomNumber}
                label="Oda"
                onChange={handleFormChange}
              >
                {roomOptions.map((room) => (
                  <MenuItem
                    key={room.roomNumber}
                    value={room.roomNumber}
                  >
                    Oda {room.roomNumber} — {room.roomType}
                  </MenuItem>
                ))}
              </Select>

              {formErrors.roomNumber && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1.75 }}
                >
                  {formErrors.roomNumber}
                </Typography>
              )}
            </FormControl>

            <TextField
              label="Oda Tipi"
              value={formData.roomType}
              disabled
              fullWidth
            />

            <TextField
              label="Giriş Tarihi"
              name="checkInDate"
              type="date"
              value={formData.checkInDate}
              onChange={handleFormChange}
              error={Boolean(formErrors.checkInDate)}
              helperText={formErrors.checkInDate}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
              required
            />

            <TextField
              label="Çıkış Tarihi"
              name="checkOutDate"
              type="date"
              value={formData.checkOutDate}
              onChange={handleFormChange}
              error={Boolean(formErrors.checkOutDate)}
              helperText={formErrors.checkOutDate}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
              required
            />

            <TextField
              label="Gecelik Fiyat"
              name="nightlyPrice"
              type="number"
              value={formData.nightlyPrice}
              onChange={handleFormChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      TL
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
            />

            <TextField
              label="Toplam Tutar"
              value={formData.totalPrice}
              disabled
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      TL
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="reservation-status-label">
                Rezervasyon Durumu
              </InputLabel>

              <Select
                labelId="reservation-status-label"
                name="reservationStatus"
                value={formData.reservationStatus}
                label="Rezervasyon Durumu"
                onChange={handleFormChange}
              >
                {reservationStatusOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="payment-status-label">
                Ödeme Durumu
              </InputLabel>

              <Select
                labelId="payment-status-label"
                name="paymentStatus"
                value={formData.paymentStatus}
                label="Ödeme Durumu"
                onChange={handleFormChange}
              >
                {paymentStatusOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Rezervasyon Notları"
              name="notes"
              value={formData.notes}
              onChange={handleFormChange}
              multiline
              rows={3}
              fullWidth
              sx={{
                gridColumn: {
                  xs: "auto",
                  sm: "1 / -1",
                },
              }}
            />
          </Box>

          <Alert
            severity="info"
            sx={{
              mt: 3,
              borderRadius: 2.5,
            }}
          >
            Konaklama süresi:{" "}
            <strong>
              {calculateNightCount(
                formData.checkInDate,
                formData.checkOutDate,
              )}{" "}
              gece
            </strong>
            . Toplam ücret seçilen oda ve tarihlere göre otomatik
            hesaplanır.
          </Alert>
        </DialogContent>

        <Divider />

        <DialogActions
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Button
            type="button"
            color="inherit"
            onClick={handleCloseReservationDialog}
          >
            Vazgeç
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={handleSaveReservation}
          >
            {editingReservationId
              ? "Değişiklikleri Kaydet"
              : "Rezervasyonu Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        {selectedReservation && (
          <>
            <DialogTitle>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  fontWeight={800}
                >
                  Rezervasyon Detayları
                </Typography>

                <IconButton
                  type="button"
                  onClick={() =>
                    setDetailsDialogOpen(false)
                  }
                >
                  <FaXmark />
                </IconButton>
              </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent>
              <Typography
                variant="caption"
                color="primary.main"
                fontWeight={800}
              >
                {selectedReservation.reservationNumber}
              </Typography>

              <Typography
                variant="h5"
                fontWeight={800}
                mt={0.5}
              >
                {selectedReservation.guestName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {selectedReservation.guestPhone}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                mt={2}
                mb={3}
              >
                <Chip
                  label={
                    getReservationStatus(
                      selectedReservation.reservationStatus,
                    ).label
                  }
                  color={
                    getReservationStatus(
                      selectedReservation.reservationStatus,
                    ).color
                  }
                />

                <Chip
                  label={
                    getPaymentStatus(
                      selectedReservation.paymentStatus,
                    ).label
                  }
                  color={
                    getPaymentStatus(
                      selectedReservation.paymentStatus,
                    ).color
                  }
                  variant="outlined"
                />
              </Stack>

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
                <DetailCard
                  title="Oda"
                  value={`Oda ${selectedReservation.roomNumber}`}
                />

                <DetailCard
                  title="Oda Tipi"
                  value={selectedReservation.roomType}
                />

                <DetailCard
                  title="Giriş Tarihi"
                  value={formatDate(
                    selectedReservation.checkInDate,
                  )}
                />

                <DetailCard
                  title="Çıkış Tarihi"
                  value={formatDate(
                    selectedReservation.checkOutDate,
                  )}
                />

                <DetailCard
                  title="Gecelik Fiyat"
                  value={formatPrice(
                    selectedReservation.nightlyPrice,
                  )}
                />

                <DetailCard
                  title="Toplam Tutar"
                  value={formatPrice(
                    selectedReservation.totalPrice,
                  )}
                />
              </Box>

              <Paper
                variant="outlined"
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2.5,
                }}
              >
                <Typography fontWeight={800}>
                  Rezervasyon Notları
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.75}
                >
                  {selectedReservation.notes ||
                    "Bu rezervasyon için not bulunmuyor."}
                </Typography>
              </Paper>
            </DialogContent>

            <DialogActions
              sx={{
                px: 3,
                pb: 2,
              }}
            >
              <Button
                type="button"
                startIcon={<FaPen />}
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleOpenEditDialog(
                    selectedReservation,
                  );
                }}
              >
                Düzenle
              </Button>

              <Button
                type="button"
                variant="contained"
                onClick={() =>
                  setDetailsDialogOpen(false)
                }
              >
                Kapat
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle fontWeight={800}>
          Rezervasyonu Sil
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            <strong>
              {selectedReservation?.reservationNumber}
            </strong>{" "}
            numaralı rezervasyonu silmek istediğinize emin
            misiniz? Bu işlem geri alınamaz.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
          }}
        >
          <Button
            type="button"
            color="inherit"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Vazgeç
          </Button>

          <Button
            type="button"
            color="error"
            variant="contained"
            startIcon={<FaTrash />}
            onClick={handleDeleteReservation}
          >
            Rezervasyonu Sil
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={(_event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          setNotification((currentNotification) => ({
            ...currentNotification,
            open: false,
          }));
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={notification.severity}
          variant="filled"
          onClose={() =>
            setNotification((currentNotification) => ({
              ...currentNotification,
              open: false,
            }))
          }
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function DetailCard({ title, value }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2.5,
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
      >
        {title}
      </Typography>

      <Typography fontWeight={800} mt={0.5}>
        {value}
      </Typography>
    </Paper>
  );
}

export default Reservations;