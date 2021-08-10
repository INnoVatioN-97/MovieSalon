import { TableRow, TableCell } from '@material-ui/core';

const CommentFactory = ({ obj }) => {
    obj.map((m) => {
        return (
            <TableRow>
                {console.log('m:', m.comment)}
                <TableCell colSpan="3" align="center">
                    "{m.comment}" - {m.user}
                    asdsadas
                </TableCell>
            </TableRow>
        );
    });
};

export default CommentFactory;
