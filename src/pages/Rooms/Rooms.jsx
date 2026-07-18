import { useState } from "react";

import {
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
  FaBed,
  FaBroom,
  FaCirclePlus,
  FaDoorOpen,
  FaUser,
} from "react-icons/fa6";

const initialRooms = [
  {
    id: 1,
    roomNumber: "101",
    floor: "1. Kat",
    type: "Standart Oda",
    capacity: 2,
    price: 2500,
    status: "Boş",
  },
  {
    id: 2,
    roomNumber: "102",
    floor: "1. Kat",
    type: "Standart Oda",
    capacity: 2,
    price: 2500,
    status: "Dolu",
  },
  {
    id: 3,
    roomNumber: "201",
    floor: "2. Kat",
    type: "Deluxe Oda",
    capacity: 3,
    price: 3750,
    status: "Temizlikte",
  },
  {
    id: 4,
    roomNumber: "202",
    floor: "2. Kat",
    type: "Deluxe Oda",
    capacity: 3,
    price: 3750,
    status: "Rezerve",
  },
  {
    id: 5,
    roomNumber: "301",
    floor: "3. Kat",
    type: "Suit Oda",
    capacity: 4,
    price: 5200,
    status: "Boş",
  },
  {
    id: 6,
    roomNumber: "302",
    floor: "3. Kat",
    type: "Suit Oda",
    capacity: 4,
    price: 5200,
    status: "Dolu",
  },
];

const roomStatuses = [
  "Tümü",
  "Boş",
  "Dolu",
  "Temizlikte",
  "Rezerve",
];

const emptyRoomForm = {
  roomNumber: "",
  floor: "",
  type: "",
  capacity: "",
  price: "",
  status: "Boş",
};

function getStatusColor(status) {
  switch (status) {
    case "Boş":
      return "success";

    case "Dolu":
      return "error";

    case "Temizlikte":
      return "warning";

    case "Rezerve":
      return "primary";

    default:
      return "default";
  }
}

function getRoomIcon(status) {
  switch (status) {
    case "Boş":
      return <FaDoorOpen />;

    case "Dolu":
      return <FaUser />;

    case "Temizlikte":
      return <FaBroom />;

    default:
      return <FaBed />;
  }
}

function Rooms() {
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roomForm, setRoomForm] = useState(emptyRoomForm);

  const filteredRooms =
    selectedStatus === "Tümü"
      ? rooms
      : rooms.filter((room) => room.status === selectedStatus);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setRoomForm(emptyRoomForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRoomForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleAddRoom = () => {
    if (
      !roomForm.roomNumber.trim() ||
      !roomForm.floor.trim() ||
      !roomForm.type.trim() ||
      !roomForm.capacity ||
      !roomForm.price
    ) {
      return;
    }

    const newRoom = {
      id: Date.now(),
      roomNumber: roomForm.roomNumber,
      floor: roomForm.floor,
      type: roomForm.type,
      capacity: Number(roomForm.capacity),
      price: Number(roomForm.price),
      status: roomForm.status,
    };

    setRooms((currentRooms) => [...currentRooms, newRoom]);

    handleDialogClose();
  };

  const handleRoomStatusChange = (roomId, newStatus) => {
    setRooms((currentRooms) =>
      currentRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: newStatus,
            }
          : room,
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
            Odalar
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.75,
              color: "text.secondary",
            }}
          >
            Otel odalarını ve oda durumlarını buradan yönetebilirsiniz.
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
          Yeni Oda Ekle
        </Button>
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
        {roomStatuses.map((status) => (
          <Chip
            key={status}
            label={status}
            clickable
            color={selectedStatus === status ? "primary" : "default"}
            variant={selectedStatus === status ? "filled" : "outlined"}
            onClick={() => setSelectedStatus(status)}
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
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2.5,
        }}
      >
        {filteredRooms.map((room) => (
          <Card
            key={room.id}
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
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      borderRadius: 2.5,
                      color: "primary.main",
                      backgroundColor: "primary.light",
                      fontSize: 20,
                    }}
                  >
                    {getRoomIcon(room.status)}
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      Oda {room.roomNumber}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: "text.secondary",
                      }}
                    >
                      {room.floor}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={room.status}
                  color={getStatusColor(room.status)}
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
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Oda tipi
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textAlign: "right",
                    }}
                  >
                    {room.type}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Kapasite
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {room.capacity} kişi
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Gecelik fiyat
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                    }}
                  >
                    {room.price.toLocaleString("tr-TR")} TL
                  </Typography>
                </Box>
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel id={`room-status-${room.id}`}>
                  Oda Durumu
                </InputLabel>

                <Select
                  labelId={`room-status-${room.id}`}
                  value={room.status}
                  label="Oda Durumu"
                  onChange={(event) =>
                    handleRoomStatusChange(room.id, event.target.value)
                  }
                  sx={{
                    borderRadius: 2.5,
                  }}
                >
                  <MenuItem value="Boş">Boş</MenuItem>
                  <MenuItem value="Dolu">Dolu</MenuItem>
                  <MenuItem value="Temizlikte">Temizlikte</MenuItem>
                  <MenuItem value="Rezerve">Rezerve</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredRooms.length === 0 && (
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Oda bulunamadı
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "text.secondary",
            }}
          >
            Bu durumda kayıtlı bir oda bulunmuyor.
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
          Yeni Oda Ekle
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
              label="Oda Numarası"
              name="roomNumber"
              value={roomForm.roomNumber}
              onChange={handleInputChange}
              fullWidth
            />

            <TextField
              label="Kat"
              name="floor"
              value={roomForm.floor}
              onChange={handleInputChange}
              placeholder="Örnek: 2. Kat"
              fullWidth
            />

            <TextField
              label="Oda Tipi"
              name="type"
              value={roomForm.type}
              onChange={handleInputChange}
              placeholder="Örnek: Standart Oda"
              fullWidth
            />

            <TextField
              label="Kapasite"
              name="capacity"
              type="number"
              value={roomForm.capacity}
              onChange={handleInputChange}
              fullWidth
            />

            <TextField
              label="Gecelik Fiyat"
              name="price"
              type="number"
              value={roomForm.price}
              onChange={handleInputChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="new-room-status-label">
                Oda Durumu
              </InputLabel>

              <Select
                labelId="new-room-status-label"
                name="status"
                value={roomForm.status}
                label="Oda Durumu"
                onChange={handleInputChange}
              >
                <MenuItem value="Boş">Boş</MenuItem>
                <MenuItem value="Dolu">Dolu</MenuItem>
                <MenuItem value="Temizlikte">Temizlikte</MenuItem>
                <MenuItem value="Rezerve">Rezerve</MenuItem>
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
            onClick={handleAddRoom}
            sx={{
              px: 2.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Odayı Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Rooms;