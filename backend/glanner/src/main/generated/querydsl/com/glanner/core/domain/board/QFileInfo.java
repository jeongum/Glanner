package com.glanner.core.domain.board;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.PathInits;
import com.querydsl.core.types.dsl.StringPath;

import javax.annotation.Generated;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;


/**
 * QFileInfo is a Querydsl query type for FileInfo
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFileInfo extends EntityPathBase<FileInfo> {

    private static final long serialVersionUID = -860903457L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFileInfo fileInfo = new QFileInfo("fileInfo");

    public final QBoard board;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath originFile = createString("originFile");

    public final StringPath saveFile = createString("saveFile");

    public final StringPath saveFolder = createString("saveFolder");

    public QFileInfo(String variable) {
        this(FileInfo.class, forVariable(variable), INITS);
    }

    public QFileInfo(Path<? extends FileInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFileInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFileInfo(PathMetadata metadata, PathInits inits) {
        this(FileInfo.class, metadata, inits);
    }

    public QFileInfo(Class<? extends FileInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoard(forProperty("board"), inits.get("board")) : null;
    }

}

