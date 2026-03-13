import { attach } from 'iocraft'
import { ref } from 'vue'

interface FileTreeNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileTreeNode[]
}

@attach()
export class SidebarService {
  fileTreeData = ref<FileTreeNode[]>([
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: '1-1', name: 'Notes.md', type: 'file' },
        { id: '1-2', name: 'Ideas.md', type: 'file' },
      ],
    },
    {
      id: '2',
      name: 'Personal',
      type: 'folder',
      children: [
        { id: '2-1', name: 'Journal.md', type: 'file' },
        { id: '2-2', name: 'Goals.md', type: 'file' },
      ],
    },
    { id: '3', name: 'README.md', type: 'file' },
  ])
}