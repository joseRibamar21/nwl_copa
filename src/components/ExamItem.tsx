import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from './Divider';
import IconButton from './IconButton';

interface ExamItemProps {
  id: number;
  title: string;
}

export default function ExamItem({ id, title }: ExamItemProps) {
  return (
    <div className="flex flex-row flex-wrap justify-between pl-3 gap-2">
      <span>{title}</span>
      <div className="flex gap-3">
        <IconButton onclick={()=>{}}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onclick={()=>{}}>
          <EditIcon />
        </IconButton>
        <IconButton onclick={()=>{}}>
          <DeleteIcon />
        </IconButton>
      </div>
      <Divider themeType="BLACK" />
    </div>
  )
}
