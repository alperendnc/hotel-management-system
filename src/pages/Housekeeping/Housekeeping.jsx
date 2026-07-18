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
  FaBroom,
  FaCircleCheck,
  FaCirclePlus,
  FaClock,
  FaTriangleExclamation,
  FaUser,
} from "react-icons/fa6";

const initialTasks = [
  {
    id: 1,
    roomNumber: "105",
    taskType: "Genel Temizlik",
    staff: "Ayşe Yılmaz",
    priority: "Yüksek",
    status: "Bekliyor",
    time: "10:30",
  },
  {
    id: 2,
    roomNumber: "208",
    taskType: "Çıkış Temizliği",
    staff: "Mehmet Kaya",
    priority: "Acil",
    status: "Devam Ediyor",
    time: "11:00",
  },
  {
    id: 3,
    roomNumber: "301",
    taskType: "Havlu Değişimi",
    staff: "Zeynep Demir",
    priority: "Normal",
    status: "Tamamlandı",
    time: "09:45",
  },
  {
    id: 4,
    roomNumber: "404",
    taskType: "Banyo Temizliği",
    staff: "Ayşe Yılmaz",
    priority: "Yüksek",
    status: "Bekliyor",
    time: "12:15",
  },
];

const taskStatuses = [
  "Tümü",
  "Bekliyor",
  "Devam Ediyor",
  "Tamamlandı",
];

const emptyTaskForm = {
  roomNumber: "",
  taskType: "",
  staff: "",
  priority: "Normal",
  status: "Bekliyor",
  time: "",
};

function getStatusColor(status) {
  switch (status) {
    case "Bekliyor":
      return "warning";

    case "Devam Ediyor":
      return "primary";

    case "Tamamlandı":
      return "success";

    default:
      return "default";
  }
}

function getPriorityColor(priority) {
  switch (priority) {
    case "Acil":
      return "error";

    case "Yüksek":
      return "warning";

    case "Normal":
      return "default";

    default:
      return "default";
  }
}

function getTaskIcon(status) {
  switch (status) {
    case "Tamamlandı":
      return <FaCircleCheck />;

    case "Devam Ediyor":
      return <FaClock />;

    case "Bekliyor":
      return <FaTriangleExclamation />;

    default:
      return <FaBroom />;
  }
}

function Housekeeping() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskForm, setTaskForm] = useState(emptyTaskForm);

  const filteredTasks =
    selectedStatus === "Tümü"
      ? tasks
      : tasks.filter((task) => task.status === selectedStatus);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTaskForm(emptyTaskForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTaskForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    if (
      !taskForm.roomNumber.trim() ||
      !taskForm.taskType.trim() ||
      !taskForm.staff.trim() ||
      !taskForm.time
    ) {
      return;
    }

    const newTask = {
      id: Date.now(),
      ...taskForm,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);

    handleDialogClose();
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  };

  const waitingCount = tasks.filter(
    (task) => task.status === "Bekliyor",
  ).length;

  const activeCount = tasks.filter(
    (task) => task.status === "Devam Ediyor",
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Tamamlandı",
  ).length;

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
            Kat Hizmetleri
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.75,
              color: "text.secondary",
            }}
          >
            Temizlik görevlerini ve personel atamalarını yönetin.
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
          Yeni Görev Ekle
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, minmax(0, 1fr))",
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
              Bekleyen Görev
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "warning.main",
              }}
            >
              {waitingCount}
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
              Devam Eden Görev
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "primary.main",
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
              Tamamlanan Görev
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "success.main",
              }}
            >
              {completedCount}
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
        {taskStatuses.map((status) => (
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
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2.5,
        }}
      >
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
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
                    {getTaskIcon(task.status)}
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Oda {task.roomNumber}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: "text.secondary",
                      }}
                    >
                      {task.taskType}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={task.priority}
                  color={getPriorityColor(task.priority)}
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
                  <FaUser size={14} />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Personel:
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {task.staff}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FaClock size={14} />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    Saat:
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {task.time}
                  </Typography>
                </Box>
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel id={`task-status-${task.id}`}>
                  Görev Durumu
                </InputLabel>

                <Select
                  labelId={`task-status-${task.id}`}
                  value={task.status}
                  label="Görev Durumu"
                  onChange={(event) =>
                    handleTaskStatusChange(task.id, event.target.value)
                  }
                  sx={{
                    borderRadius: 2.5,
                  }}
                >
                  <MenuItem value="Bekliyor">Bekliyor</MenuItem>

                  <MenuItem value="Devam Ediyor">
                    Devam Ediyor
                  </MenuItem>

                  <MenuItem value="Tamamlandı">
                    Tamamlandı
                  </MenuItem>
                </Select>
              </FormControl>

              <Chip
                label={task.status}
                color={getStatusColor(task.status)}
                sx={{
                  mt: 2,
                  fontWeight: 600,
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredTasks.length === 0 && (
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
            Görev bulunamadı
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "text.secondary",
            }}
          >
            Bu durumda kayıtlı bir temizlik görevi bulunmuyor.
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
          Yeni Temizlik Görevi
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
              value={taskForm.roomNumber}
              onChange={handleInputChange}
              fullWidth
            />

            <TextField
              label="Görev Türü"
              name="taskType"
              value={taskForm.taskType}
              onChange={handleInputChange}
              placeholder="Örnek: Genel Temizlik"
              fullWidth
            />

            <TextField
              label="Personel"
              name="staff"
              value={taskForm.staff}
              onChange={handleInputChange}
              placeholder="Personel adı"
              fullWidth
            />

            <TextField
              label="Saat"
              name="time"
              type="time"
              value={taskForm.time}
              onChange={handleInputChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="task-priority-label">
                Öncelik
              </InputLabel>

              <Select
                labelId="task-priority-label"
                name="priority"
                value={taskForm.priority}
                label="Öncelik"
                onChange={handleInputChange}
              >
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Yüksek">Yüksek</MenuItem>
                <MenuItem value="Acil">Acil</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="new-task-status-label">
                Görev Durumu
              </InputLabel>

              <Select
                labelId="new-task-status-label"
                name="status"
                value={taskForm.status}
                label="Görev Durumu"
                onChange={handleInputChange}
              >
                <MenuItem value="Bekliyor">Bekliyor</MenuItem>

                <MenuItem value="Devam Ediyor">
                  Devam Ediyor
                </MenuItem>

                <MenuItem value="Tamamlandı">
                  Tamamlandı
                </MenuItem>
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
            onClick={handleAddTask}
            sx={{
              px: 2.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Görevi Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Housekeeping;