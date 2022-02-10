package com.glanner.api.service;

import com.glanner.api.dto.request.AddCommentReqDto;
import com.glanner.api.dto.request.SaveBoardReqDto;
import com.glanner.api.dto.request.UpdateCommentReqDto;
import com.glanner.api.exception.BoardNotFoundException;
import com.glanner.api.exception.CommentNotFoundException;
import com.glanner.api.exception.FileNotSavedException;
import com.glanner.api.exception.UserNotFoundException;
import com.glanner.core.domain.board.Board;
import com.glanner.core.domain.board.Comment;
import com.glanner.core.domain.board.FileInfo;
import com.glanner.core.domain.user.Notification;
import com.glanner.core.domain.user.NotificationStatus;
import com.glanner.core.domain.user.NotificationType;
import com.glanner.core.domain.user.User;
import com.glanner.core.repository.BoardRepository;
import com.glanner.core.repository.CommentRepository;
import com.glanner.core.repository.NotificationRepository;
import com.glanner.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService{

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public void saveBoard(String userEmail, SaveBoardReqDto requestDto) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(UserNotFoundException::new);
        Board board = requestDto.toEntity(user);
        List<FileInfo> fileInfos = getFileInfos(requestDto.getFiles());
        board.changeFileInfo(fileInfos);
        boardRepository.save(board);
    }

    @Override
    public void modifyBoard(Long boardId, SaveBoardReqDto requestDto) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        board.changeBoard(
                requestDto.getTitle(),
                requestDto.getContent(),
                getFileInfos(requestDto.getFiles()));
    }

    @Override
    public void deleteBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        boardRepository.delete(board);
    }

    @Override
    public void addComment(String userEmail, AddCommentReqDto requestDto) {
        User findUser = userRepository.findByEmail(userEmail).orElseThrow(UserNotFoundException::new);
        Board board = boardRepository.findById(requestDto.getBoardId()).orElseThrow(BoardNotFoundException::new);
        Comment parent = null;
        if(requestDto.getParentId() != null){
            parent = commentRepository.findById(requestDto.getParentId()).orElseThrow(CommentNotFoundException::new);
        }
        Comment comment = new Comment(requestDto.getContent(), findUser, parent, board);
        board.addComment(comment);

        if(!findUser.equals(board.getUser())) {
            Notification notification = Notification.builder()
                    .user(board.getUser())
                    .type(NotificationType.BOARD)
                    .typeId(board.getId())
                    .content(makeContent(board.getTitle()))
                    .confirmation(NotificationStatus.STILL_NOT_CONFIRMED)
                    .build();
            board.getUser().addNotification(notification);
        }
    }

    @Override
    public void modifyComment(Long commentId, UpdateCommentReqDto requestDto) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);
        comment.changeContent(requestDto.getContent());
    }

    @Override
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);
        commentRepository.delete(comment);
    }

    private List<FileInfo> getFileInfos(List<MultipartFile> files) {
        List<FileInfo> fileInfos = new ArrayList<>();
        if(!files.isEmpty()){
            String realPath = "uploads/";
            String date = new SimpleDateFormat("yyMMdd").format(new Date());
            String saveFolder = realPath + File.separator + date;

            File folder = new File(saveFolder);

            if(!folder.exists()) folder.mkdir();
            for(MultipartFile file: files){
                String originalFileName = file.getOriginalFilename();
                FileInfo fileInfo = null;
                if(!originalFileName.isEmpty()){
                    String saveFileName = UUID.randomUUID().toString()
                            + originalFileName.substring(originalFileName.lastIndexOf('.'));
                    fileInfo = FileInfo.builder()
                            .saveFolder(date)
                            .originFile(originalFileName)
                            .saveFile(saveFileName).build();
                    try {
                        file.transferTo(new File(folder, saveFileName));
                    } catch (Exception e) {
                        throw new FileNotSavedException();
                    }
                }
                fileInfos.add(fileInfo);
            }
        }
        return fileInfos;
    }

    private String makeContent(String title) {
        return "["+title+"] 글에 댓글이 작성되었습니다.";
    }
}
