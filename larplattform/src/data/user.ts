// TODO: Replace with API call to /api/me
export const teacherUser = {
  id: 'u-001',
  name: 'Conny Lindgren',
  initials: 'CL',
  role: 'teacher' as const,
  school: 'Stiernhööksgymnasiet i Rättvik',
  unit: 'Rättvik',
  color: '#166534',
  notificationCount: 2,
  enrolledGroupIds: null,
}

export const studentUser = {
  id: 'u-002',
  name: 'Alex Bergström',
  initials: 'AB',
  role: 'student' as const,
  school: 'Stiernhööksgymnasiet i Rättvik',
  unit: 'Rättvik',
  color: '#7c3aed',
  notificationCount: 3,
  enrolledGroupIds: ['g-08', 'g-03', 'g-09'] as string[],
}

// Backwards-compatible alias for components that haven't been updated
export const currentUser = teacherUser
