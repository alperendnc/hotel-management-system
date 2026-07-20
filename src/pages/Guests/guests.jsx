import { useMemo, useState } from "react";

import {
  Avatar,
  Box,
  Button,
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
  Alert,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  FaBed,
  FaCalendarCheck,
  FaCalendarXmark,
  FaCircleCheck,
  FaClockRotateLeft,
  FaCreditCard,
  FaEye,
  FaMagnifyingGlass,
  FaPen,
  FaPlus,
  FaTrash,
  FaUserCheck,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";

const initialGuests = [
  {
    id: 1,
    fullName: "Ahmet Yılmaz",
    phone: "0555 111 22 33",
    email: "ahmet@example.com",
    nationality: "Türkiye",
    documentType: "T.C. Kimlik",
    documentNumber: "12345678901",
    roomNumber: "102",
    checkInDate: "2026-07-20",
    checkOutDate: "2026-07-23",
    guestStatus: "staying",
    paymentStatus: "paid",
    totalPrice: 7500,
    notes: "Geç giriş yaptı. Sessiz oda tercih ediyor.",
  },
  {
    id: 2,
    fullName: "Elif Kaya",
    phone: "0555 444 55 66",
    email: "elif@example.com",
    nationality: "Türkiye",
    documentType: "T.C. Kimlik",
    documentNumber: "10987654321",
    roomNumber: "204",
    checkInDate: "2026-07-15",
    checkOutDate: "2026-07-18",
    guestStatus: "checked-out",
    paymentStatus: "paid",
    totalPrice: 9200,
    notes: "Daha önce iki kez konakladı.",
  },
  {
    id: 3,
    fullName: "Michael Brown",
    phone: "+44 7700 900123",
    email: "michael@example.com",
    nationality: "Birleşik Krallık",
    documentType: "Pasaport",
    documentNumber: "GB458921",
    roomNumber: "305",
    checkInDate: "2026-07-21",
    checkOutDate: "2026-07-25",
    guestStatus: "reserved",
    paymentStatus: "partial",
    totalPrice: 14000,
    notes: "Havalimanı transferi talep etti.",
  },
];

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  nationality: "Türkiye",
  documentType: "T.C. Kimlik",
  documentNumber: "",
  roomNumber: "",
  checkInDate: "",
  checkOutDate: "",
  guestStatus: "reserved",
  paymentStatus: "unpaid",
  totalPrice: "",
  notes: "",
};

const guestStatusOptions = [
  {
    value: "reserved",
    label: "Rezervasyonlu",
  },
  {
    value: "staying",
    label: "Konaklıyor",
  },
  {
    value: "checked-out",
    label: "Çıkış Yaptı",
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

function getGuestStatusDetails(status) {
  const statuses = {
    staying: {
      label: "Konaklıyor",
      color: "success",
    },
    reserved: {
      label: "Rezervasyonlu",
      color: "info",
    },
    "checked-out": {
      label: "Çıkış Yaptı",
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

function getPaymentStatusDetails(status) {
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

function Guests() {
  const [guests, setGuests] = useState(initialGuests);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [guestDialogOpen, setGuestDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedGuest, setSelectedGuest] = useState(null);
  const [editingGuestId, setEditingGuestId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const filteredGuests = useMemo(() => {
    const normalizedSearchTerm = searchTerm
      .trim()
      .toLocaleLowerCase("tr-TR");

    return guests.filter((guest) => {
      const matchesSearch =
        guest.fullName
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedSearchTerm) ||
        guest.phone
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedSearchTerm) ||
        guest.roomNumber
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedSearchTerm) ||
        guest.email
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedSearchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        guest.guestStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [guests, searchTerm, statusFilter]);

  const statistics = useMemo(() => {
    return {
      total: guests.length,

      staying: guests.filter(
        (guest) => guest.guestStatus === "staying",
      ).length,

      reserved: guests.filter(
        (guest) => guest.guestStatus === "reserved",
      ).length,

      unpaid: guests.filter(
        (guest) =>
          guest.paymentStatus === "unpaid" ||
          guest.paymentStatus === "partial",
      ).length,
    };
  }, [guests]);

  const showNotification = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleOpenAddDialog = () => {
    setEditingGuestId(null);
    setFormData(emptyForm);
    setFormErrors({});
    setGuestDialogOpen(true);
  };

  const handleOpenEditDialog = (guest) => {
    setEditingGuestId(guest.id);

    setFormData({
      fullName: guest.fullName,
      phone: guest.phone,
      email: guest.email,
      nationality: guest.nationality,
      documentType: guest.documentType,
      documentNumber: guest.documentNumber,
      roomNumber: guest.roomNumber,
      checkInDate: guest.checkInDate,
      checkOutDate: guest.checkOutDate,
      guestStatus: guest.guestStatus,
      paymentStatus: guest.paymentStatus,
      totalPrice: guest.totalPrice,
      notes: guest.notes,
    });

    setFormErrors({});
    setGuestDialogOpen(true);
  };

  const handleOpenDetailsDialog = (guest) => {
    setSelectedGuest(guest);
    setDetailsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (guest) => {
    setSelectedGuest(guest);
    setDeleteDialogOpen(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Ad soyad zorunludur.";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Telefon numarası zorunludur.";
    }

    if (!formData.roomNumber.trim()) {
      errors.roomNumber = "Oda numarası zorunludur.";
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
      formData.checkOutDate < formData.checkInDate
    ) {
      errors.checkOutDate =
        "Çıkış tarihi giriş tarihinden önce olamaz.";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = "Geçerli bir e-posta adresi girin.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSaveGuest = () => {
    if (!validateForm()) {
      showNotification(
        "Lütfen zorunlu alanları kontrol edin.",
        "error",
      );

      return;
    }

    if (editingGuestId) {
      setGuests((currentGuests) =>
        currentGuests.map((guest) =>
          guest.id === editingGuestId
            ? {
                ...guest,
                ...formData,
                totalPrice: Number(formData.totalPrice) || 0,
              }
            : guest,
        ),
      );

      showNotification("Misafir bilgileri güncellendi.");
    } else {
      const newGuest = {
        id: Date.now(),
        ...formData,
        totalPrice: Number(formData.totalPrice) || 0,
      };

      setGuests((currentGuests) => [
        newGuest,
        ...currentGuests,
      ]);

      showNotification("Yeni misafir başarıyla eklendi.");
    }

    setGuestDialogOpen(false);
    setEditingGuestId(null);
    setFormData(emptyForm);
  };

  const handleDeleteGuest = () => {
    if (!selectedGuest) {
      return;
    }

    setGuests((currentGuests) =>
      currentGuests.filter(
        (guest) => guest.id !== selectedGuest.id,
      ),
    );

    setDeleteDialogOpen(false);
    setSelectedGuest(null);

    showNotification("Misafir kaydı silindi.", "info");
  };

  const statisticCards = [
    {
      title: "Toplam Misafir",
      value: statistics.total,
      description: "Kayıtlı misafir sayısı",
      icon: <FaUsers />,
      backgroundColor: "primary.main",
    },
    {
      title: "Konaklayanlar",
      value: statistics.staying,
      description: "Şu anda otelde",
      icon: <FaUserCheck />,
      backgroundColor: "success.main",
    },
    {
      title: "Rezervasyonlar",
      value: statistics.reserved,
      description: "Giriş yapması beklenen",
      icon: <FaCalendarCheck />,
      backgroundColor: "info.main",
    },
    {
      title: "Bekleyen Ödeme",
      value: statistics.unpaid,
      description: "Eksik veya ödenmemiş",
      icon: <FaCreditCard />,
      backgroundColor: "warning.main",
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
            fontWeight={800}
          >
            Misafir Yönetimi
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Misafir kayıtlarını, konaklama bilgilerini ve ödeme
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
          Yeni Misafir Ekle
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {statisticCards.map((card) => (
          <Paper
            key={card.title}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: 1,
              borderColor: "divider",
            }}
          >
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
                  borderRadius: 3,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: card.backgroundColor,
                  color: "#ffffff",
                  fontSize: 20,
                }}
              >
                {card.icon}
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
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
            placeholder="İsim, telefon, e-posta veya oda numarası ara..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaMagnifyingGlass />
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            sx={{
              minWidth: {
                xs: "100%",
                md: 220,
              },
            }}
          >
            <InputLabel id="guest-status-filter-label">
              Misafir Durumu
            </InputLabel>

            <Select
              labelId="guest-status-filter-label"
              value={statusFilter}
              label="Misafir Durumu"
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <MenuItem value="all">Tüm Misafirler</MenuItem>

              {guestStatusOptions.map((option) => (
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

      {filteredGuests.length === 0 ? (
        <Paper
          sx={{
            py: 8,
            px: 3,
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: "action.hover",
              color: "text.secondary",
              mx: "auto",
              mb: 2,
              fontSize: 27,
            }}
          >
            <FaUsers />
          </Box>

          <Typography
            variant="h6"
            fontWeight={800}
          >
            Misafir bulunamadı
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Arama veya filtre seçeneklerini değiştirin.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {filteredGuests.map((guest) => {
            const guestStatus = getGuestStatusDetails(
              guest.guestStatus,
            );

            const paymentStatus = getPaymentStatusDetails(
              guest.paymentStatus,
            );

            return (
              <Paper
                key={guest.id}
                sx={{
                  p: {
                    xs: 2,
                    md: 2.5,
                  },
                  borderRadius: 3,
                  border: 1,
                  borderColor: "divider",
                  transition:
                    "transform 0.2s, box-shadow 0.2s",

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
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <Avatar
                      sx={{
                        width: 52,
                        height: 52,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        fontWeight: 800,
                      }}
                    >
                      {guest.fullName
                        .split(" ")
                        .slice(0, 2)
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </Avatar>

                    <Box>
                      <Typography fontWeight={800}>
                        {guest.fullName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {guest.phone}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {guest.email || "E-posta belirtilmedi"}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                        lg: "repeat(5, minmax(120px, 1fr))",
                      },
                      gap: 2,
                      flex: 1,
                      maxWidth: {
                        xl: 780,
                      },
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
                        mt={0.4}
                      >
                        <FaBed size={14} />

                        <Typography fontWeight={700}>
                          {guest.roomNumber}
                        </Typography>
                      </Stack>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Giriş
                      </Typography>

                      <Typography fontWeight={700}>
                        {formatDate(guest.checkInDate)}
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
                        {formatDate(guest.checkOutDate)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Misafir Durumu
                      </Typography>

                      <Box mt={0.5}>
                        <Chip
                          label={guestStatus.label}
                          color={guestStatus.color}
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Ödeme
                      </Typography>

                      <Box mt={0.5}>
                        <Chip
                          label={paymentStatus.label}
                          color={paymentStatus.color}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Stack
                    direction="row"
                    justifyContent={{
                      xs: "flex-end",
                      xl: "initial",
                    }}
                    spacing={0.5}
                  >
                    <Tooltip title="Detayları görüntüle">
                      <IconButton
                        type="button"
                        onClick={() =>
                          handleOpenDetailsDialog(guest)
                        }
                        aria-label="Misafir detaylarını görüntüle"
                      >
                        <FaEye size={17} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Düzenle">
                      <IconButton
                        type="button"
                        color="primary"
                        onClick={() =>
                          handleOpenEditDialog(guest)
                        }
                        aria-label="Misafiri düzenle"
                      >
                        <FaPen size={16} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Sil">
                      <IconButton
                        type="button"
                        color="error"
                        onClick={() =>
                          handleOpenDeleteDialog(guest)
                        }
                        aria-label="Misafiri sil"
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
        open={guestDialogOpen}
        onClose={() => setGuestDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            pb: 1,
          }}
        >
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
                {editingGuestId
                  ? "Misafir Bilgilerini Düzenle"
                  : "Yeni Misafir Ekle"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Misafir ve konaklama bilgilerini eksiksiz girin.
              </Typography>
            </Box>

            <IconButton
              type="button"
              onClick={() => setGuestDialogOpen(false)}
              aria-label="Pencereyi kapat"
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
            Kişisel Bilgiler
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 2,
            }}
          >
            <TextField
              name="fullName"
              label="Ad Soyad"
              value={formData.fullName}
              onChange={handleFormChange}
              error={Boolean(formErrors.fullName)}
              helperText={formErrors.fullName}
              required
              fullWidth
            />

            <TextField
              name="phone"
              label="Telefon"
              value={formData.phone}
              onChange={handleFormChange}
              error={Boolean(formErrors.phone)}
              helperText={formErrors.phone}
              required
              fullWidth
            />

            <TextField
              name="email"
              label="E-posta"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
              fullWidth
            />

            <TextField
              name="nationality"
              label="Uyruk"
              value={formData.nationality}
              onChange={handleFormChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="document-type-label">
                Belge Türü
              </InputLabel>

              <Select
                labelId="document-type-label"
                name="documentType"
                value={formData.documentType}
                label="Belge Türü"
                onChange={handleFormChange}
              >
                <MenuItem value="T.C. Kimlik">
                  T.C. Kimlik
                </MenuItem>

                <MenuItem value="Pasaport">
                  Pasaport
                </MenuItem>

                <MenuItem value="Ehliyet">Ehliyet</MenuItem>

                <MenuItem value="Diğer">Diğer</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="documentNumber"
              label="Belge Numarası"
              value={formData.documentNumber}
              onChange={handleFormChange}
              fullWidth
            />
          </Box>

          <Divider
            sx={{
              my: 3,
            }}
          />

          <Typography
            variant="subtitle2"
            fontWeight={800}
            mb={2}
          >
            Konaklama Bilgileri
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 2,
            }}
          >
            <TextField
              name="roomNumber"
              label="Oda Numarası"
              value={formData.roomNumber}
              onChange={handleFormChange}
              error={Boolean(formErrors.roomNumber)}
              helperText={formErrors.roomNumber}
              required
              fullWidth
            />

            <TextField
              name="totalPrice"
              label="Toplam Tutar"
              type="number"
              value={formData.totalPrice}
              onChange={handleFormChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    TL
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="checkInDate"
              label="Giriş Tarihi"
              type="date"
              value={formData.checkInDate}
              onChange={handleFormChange}
              error={Boolean(formErrors.checkInDate)}
              helperText={formErrors.checkInDate}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              name="checkOutDate"
              label="Çıkış Tarihi"
              type="date"
              value={formData.checkOutDate}
              onChange={handleFormChange}
              error={Boolean(formErrors.checkOutDate)}
              helperText={formErrors.checkOutDate}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="guest-status-label">
                Misafir Durumu
              </InputLabel>

              <Select
                labelId="guest-status-label"
                name="guestStatus"
                value={formData.guestStatus}
                label="Misafir Durumu"
                onChange={handleFormChange}
              >
                {guestStatusOptions.map((option) => (
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
              name="notes"
              label="Misafir Notları"
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
            onClick={() => setGuestDialogOpen(false)}
          >
            Vazgeç
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={handleSaveGuest}
          >
            {editingGuestId
              ? "Değişiklikleri Kaydet"
              : "Misafiri Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        {selectedGuest && (
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
                  Misafir Detayları
                </Typography>

                <IconButton
                  type="button"
                  onClick={() => setDetailsDialogOpen(false)}
                >
                  <FaXmark />
                </IconButton>
              </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent>
              <Stack
                alignItems="center"
                textAlign="center"
                spacing={1}
                mb={3}
              >
                <Avatar
                  sx={{
                    width: 74,
                    height: 74,
                    bgcolor: "primary.main",
                    fontSize: 24,
                    fontWeight: 800,
                  }}
                >
                  {selectedGuest.fullName
                    .split(" ")
                    .slice(0, 2)
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
                </Avatar>

                <Typography
                  variant="h6"
                  fontWeight={800}
                >
                  {selectedGuest.fullName}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  justifyContent="center"
                  useFlexGap
                >
                  <Chip
                    size="small"
                    label={
                      getGuestStatusDetails(
                        selectedGuest.guestStatus,
                      ).label
                    }
                    color={
                      getGuestStatusDetails(
                        selectedGuest.guestStatus,
                      ).color
                    }
                  />

                  <Chip
                    size="small"
                    variant="outlined"
                    label={
                      getPaymentStatusDetails(
                        selectedGuest.paymentStatus,
                      ).label
                    }
                    color={
                      getPaymentStatusDetails(
                        selectedGuest.paymentStatus,
                      ).color
                    }
                  />
                </Stack>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <DetailItem
                  title="Telefon"
                  value={selectedGuest.phone}
                />

                <DetailItem
                  title="E-posta"
                  value={selectedGuest.email || "-"}
                />

                <DetailItem
                  title="Uyruk"
                  value={selectedGuest.nationality}
                />

                <DetailItem
                  title="Belge"
                  value={`${selectedGuest.documentType} - ${
                    selectedGuest.documentNumber || "-"
                  }`}
                />

                <DetailItem
                  title="Oda"
                  value={selectedGuest.roomNumber}
                  icon={<FaBed />}
                />

                <DetailItem
                  title="Toplam Tutar"
                  value={formatPrice(selectedGuest.totalPrice)}
                  icon={<FaCreditCard />}
                />

                <DetailItem
                  title="Giriş Tarihi"
                  value={formatDate(
                    selectedGuest.checkInDate,
                  )}
                  icon={<FaCalendarCheck />}
                />

                <DetailItem
                  title="Çıkış Tarihi"
                  value={formatDate(
                    selectedGuest.checkOutDate,
                  )}
                  icon={<FaCalendarXmark />}
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
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  mb={1}
                >
                  <FaClockRotateLeft />

                  <Typography fontWeight={800}>
                    Misafir Notları
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {selectedGuest.notes ||
                    "Bu misafir için not bulunmuyor."}
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
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleOpenEditDialog(selectedGuest);
                }}
                startIcon={<FaPen />}
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
          Misafir Kaydını Sil
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            <strong>{selectedGuest?.fullName}</strong> isimli
            misafirin kaydını silmek istediğinize emin
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
            onClick={handleDeleteGuest}
          >
            Kaydı Sil
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() =>
          setNotification((currentNotification) => ({
            ...currentNotification,
            open: false,
          }))
        }
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
          icon={<FaCircleCheck />}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function DetailItem({ title, value, icon }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2.5,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        mb={0.5}
      >
        {icon && (
          <Box
            sx={{
              color: "primary.main",
              display: "flex",
              fontSize: 14,
            }}
          >
            {icon}
          </Box>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {title}
        </Typography>
      </Stack>

      <Typography fontWeight={700}>{value}</Typography>
    </Paper>
  );
}

export default Guests;