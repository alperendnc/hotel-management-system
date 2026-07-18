import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  FaBriefcase,
  FaCirclePlus,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa6";

const initialStaff = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    department: "Kat Hizmetleri",
    position: "Temizlik Personeli",
    phone: "0555 111 22 33",
    email: "ayse.yilmaz@otel.com",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    department: "Resepsiyon",
    position: "Resepsiyon Görevlisi",
    phone: "0555 222 33 44",
    email: "mehmet.kaya@otel.com",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    department: "Kat Hizmetleri",
    position: "Kat Sorumlusu",
    phone: "0555 333 44 55",
    email: "zeynep.demir@otel.com",
    status: "İzinli",
  },
  {
    id: 4,
    name: "Emre Çelik",
    department: "Teknik Servis",
    position: "Teknik Personel",
    phone: "0555 444 55 66",
    email: "emre.celik@otel.com",
    status: "Aktif",
  },
  {
    id: 5,
    name: "Elif Arslan",
    department: "Yönetim",
    position: "Otel Müdürü",
    phone: "0555 555 66 77",
    email: "elif.arslan@otel.com",
    status: "Aktif",
  },
  {
    id: 6,
    name: "Can Öztürk",
    department: "Resepsiyon",
    position: "Gece Resepsiyonisti",
    phone: "0555 666 77 88",
    email: "can.ozturk@otel.com",
    status: "Pasif",
  },
];

const departments = [
  "Tümü",
  "Resepsiyon",
  "Kat Hizmetleri",
  "Teknik Servis",
  "Yönetim",
];

const emptyStaffForm = {
  name: "",
  department: "",
  position: "",
  phone: "",
  email: "",
  status: "Aktif",
};

function getStatusColor(status) {
  switch (status) {
    case "Aktif":
      return "success";

    case "İzinli":
      return "warning";

    case "Pasif":
      return "default";

    default:
      return "default";
  }
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Staff() {
  const [staffList, setStaffList] = useState(initialStaff);
  const [selectedDepartment, setSelectedDepartment] = useState("Tümü");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [staffForm, setStaffForm] = useState(emptyStaffForm);

  const filteredStaff =
    selectedDepartment === "Tümü"
      ? staffList
      : staffList.filter(
          (staff) => staff.department === selectedDepartment,
        );

  const activeCount = staffList.filter(
    (staff) => staff.status === "Aktif",
  ).length;

  const leaveCount = staffList.filter(
    (staff) => staff.status === "İzinli",
  ).length;

  const passiveCount = staffList.filter(
    (staff) => staff.status === "Pasif",
  ).length;

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setStaffForm(emptyStaffForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setStaffForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleAddStaff = () => {
    if (
      !staffForm.name.trim() ||
      !staffForm.department ||
      !staffForm.position.trim() ||
      !staffForm.phone.trim() ||
      !staffForm.email.trim()
    ) {
      return;
    }

    const newStaff = {
      id: Date.now(),
      ...staffForm,
    };

    setStaffList((currentStaff) => [...currentStaff, newStaff]);

    handleDialogClose();
  };

  const handleStatusChange = (staffId, newStatus) => {
    setStaffList((currentStaff) =>
      currentStaff.map((staff) =>
        staff.id === staffId
          ? {
              ...staff,
              status: newStatus,
            }
          : staff,
      ),
    );
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
            Personeller
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.75,
              color: "text.secondary",
            }}
          >
            Otel çalışanlarını ve personel durumlarını yönetin.
          </Typography>
        </Box>

        <Button
          type="button"
          variant="contained"
          startIcon={<FaCirclePlus />}
          onClick={handleDialogOpen}
          sx={{
            minHeight: 42,
            px: 2.5,
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Yeni Personel Ekle
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              Toplam Personel
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 700,
              }}
            >
              {staffList.length}
            </Typography>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              Aktif Personel
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "success.main",
              }}
            >
              {activeCount}
            </Typography>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              İzinli Personel
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "warning.main",
              }}
            >
              {leaveCount}
            </Typography>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              Pasif Personel
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "text.secondary",
              }}
            >
              {passiveCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          pb: 1,
          overflowX: "auto",
        }}
      >
        {departments.map((department) => (
          <Chip
            key={department}
            label={department}
            clickable
            color={
              selectedDepartment === department
                ? "primary"
                : "default"
            }
            variant={
              selectedDepartment === department
                ? "filled"
                : "outlined"
            }
            onClick={() => setSelectedDepartment(department)}
            sx={{
              height: 38,
              px: 0.5,
              flexShrink: 0,
              borderRadius: 2.5,
              fontWeight: 600,
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2.5,
        }}
      >
        {filteredStaff.map((staff) => (
          <Card
            key={staff.id}
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
                p: 2.5,

                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 2.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: "primary.main",
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(staff.name)}
                  </Avatar>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {staff.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: "text.secondary",
                      }}
                    >
                      {staff.position}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={staff.status}
                  color={getStatusColor(staff.status)}
                  size="small"
                  sx={{
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                  mb: 2.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FaBriefcase size={14} />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Departman:
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {staff.department}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FaPhone size={14} />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {staff.phone}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    minWidth: 0,
                  }}
                >
                  <FaEnvelope size={14} />

                  <Typography
                    variant="body2"
                    noWrap
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {staff.email}
                  </Typography>
                </Box>
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel id={`staff-status-${staff.id}`}>
                  Personel Durumu
                </InputLabel>

                <Select
                  labelId={`staff-status-${staff.id}`}
                  value={staff.status}
                  label="Personel Durumu"
                  onChange={(event) =>
                    handleStatusChange(staff.id, event.target.value)
                  }
                  sx={{
                    borderRadius: 2.5,
                  }}
                >
                  <MenuItem value="Aktif">Aktif</MenuItem>
                  <MenuItem value="İzinli">İzinli</MenuItem>
                  <MenuItem value="Pasif">Pasif</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredStaff.length === 0 && (
        <Box
          sx={{
            mt: 4,
            p: 5,
            textAlign: "center",
            border: 1,
            borderStyle: "dashed",
            borderColor: "divider",
            borderRadius: 3,
            backgroundColor: "background.paper",
          }}
        >
          <FaUser size={30} />

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: 700,
            }}
          >
            Personel bulunamadı
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "text.secondary",
            }}
          >
            Bu departmanda kayıtlı personel bulunmuyor.
          </Typography>
        </Box>
      )}

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          Yeni Personel Ekle
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
              pt: 1,
            }}
          >
            <TextField
              label="Ad Soyad"
              name="name"
              value={staffForm.name}
              onChange={handleInputChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="staff-department-label">
                Departman
              </InputLabel>

              <Select
                labelId="staff-department-label"
                name="department"
                value={staffForm.department}
                label="Departman"
                onChange={handleInputChange}
              >
                <MenuItem value="Resepsiyon">
                  Resepsiyon
                </MenuItem>

                <MenuItem value="Kat Hizmetleri">
                  Kat Hizmetleri
                </MenuItem>

                <MenuItem value="Teknik Servis">
                  Teknik Servis
                </MenuItem>

                <MenuItem value="Yönetim">
                  Yönetim
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Pozisyon"
              name="position"
              value={staffForm.position}
              onChange={handleInputChange}
              placeholder="Örnek: Resepsiyon Görevlisi"
              fullWidth
            />

            <TextField
              label="Telefon"
              name="phone"
              value={staffForm.phone}
              onChange={handleInputChange}
              placeholder="0555 000 00 00"
              fullWidth
            />

            <TextField
              label="E-posta"
              name="email"
              type="email"
              value={staffForm.email}
              onChange={handleInputChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="new-staff-status-label">
                Personel Durumu
              </InputLabel>

              <Select
                labelId="new-staff-status-label"
                name="status"
                value={staffForm.status}
                label="Personel Durumu"
                onChange={handleInputChange}
              >
                <MenuItem value="Aktif">Aktif</MenuItem>
                <MenuItem value="İzinli">İzinli</MenuItem>
                <MenuItem value="Pasif">Pasif</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          <Button
            type="button"
            color="inherit"
            onClick={handleDialogClose}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            İptal
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={handleAddStaff}
            sx={{
              px: 2.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Personeli Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Staff;